// Zaufani v1.0 Service Worker
// Enables offline support and app installation

const CACHE_NAME = 'zaufani-v1.0-cache-v2';
const ASSETS_TO_CACHE = [
  '/Zaufani-v1.0/index.html',
  '/Zaufani-v1.0/manifest.json',
  '/Zaufani-v1.0/service-worker.js'
];

// Install event: cache files
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[Service Worker] Caching files');
      return cache.addAll(ASSETS_TO_CACHE);
    }).catch(err => {
      console.warn('[Service Worker] Cache failed:', err);
    })
  );
  self.skipWaiting();
});

// Activate event: clean up old caches
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event: serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // For Firebase requests, always go to network
  if (event.request.url.includes('firebase') ||
      event.request.url.includes('firebaseio.com')) {
    event.respondWith(
      fetch(event.request).catch(err => {
        console.log('[Service Worker] Firebase fetch failed (offline):', err.message);
        return new Response('Offline - Firebase unavailable', { status: 503 });
      })
    );
    return;
  }

  // For other requests: try network first, fallback to cache
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache successful responses
        if (response.ok && !response.headers.get('content-type')?.includes('text/html')) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(err => {
        console.log('[Service Worker] Fetch failed, using cache:', event.request.url);
        // Fallback to cache
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Return offline page if not cached
            return new Response('Offline - Page not cached', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

// Handle messages from clients
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('[Service Worker] Loaded for Zaufani v1.0');
