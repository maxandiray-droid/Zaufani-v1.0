// Zaufani Rodzina Service Worker
const CACHE_NAME = 'zaufani-v1.0.0';
const urlsToCache = [
  '/',
  '/zaufani-rodzina.html',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Lato:wght@300;400;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache).catch(err => {
        console.log('Cache some items failed, continuing...', err);
        // Continue even if some items fail to cache
        return Promise.resolve();
      });
    })
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Handle API requests differently
  if (event.request.url.includes('paypal') ||
      event.request.url.includes('googleapis') ||
      event.request.url.includes('firebase')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache successful responses
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // Return cached version if network fails
          return caches.match(event.request);
        })
    );
  } else {
    // For other requests, try cache first, then network
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response;
          }
          return fetch(event.request).then(response => {
            // Don't cache if not a success response
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
            return response;
          });
        })
        .catch(() => {
          // Return offline page or generic fallback
          return new Response('Offline - veuillez vérifier votre connexion', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({ 'Content-Type': 'text/plain' })
          });
        })
    );
  }
});

// Handle background sync for offline operations
self.addEventListener('sync', event => {
  if (event.tag === 'sync-marketplace') {
    event.waitUntil(
      // Sync marketplace data when connection returns
      fetch('/zaufani-rodzina.html')
        .then(response => response.ok)
        .catch(() => false)
    );
  }
});

// Push notifications
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || '📬 Nouvelle notification Zaufani',
    icon: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 192 192%22%3E%3Crect fill=%22%23C8792A%22 width=%22192%22 height=%22192%22/%3E%3Ccircle cx=%2296%22 cy=%2260%22 r=%2230%22 fill=%22%23FAF6EF%22/%3E%3Cpath d=%22M96 120 L60 160 L132 160 Z%22 fill=%22%23FAF6EF%22/%3E%3C/svg%3E',
    badge: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 96 96%22%3E%3Ccircle cx=%2248%22 cy=%2248%22 r=%2248%22 fill=%22%23C8792A%22/%3E%3Ctext x=%2748%27 y=%2762%27 font-size=%2748%27 text-anchor=%27middle%27 fill=%27%23FFF%27%3E✦%3C/text%3E%3C/svg%3E',
    badge: '#C8792A'
  };

  event.waitUntil(self.registration.showNotification('Zaufani Rodzina', options));
});
