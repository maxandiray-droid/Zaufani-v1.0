// Zaufani v1.0 Service Worker
// Enables offline support and app installation

const CACHE_NAME = 'zaufani-v1.0-cache-v3';
// Only pre-cache the manifest so install doesn't depend on a particular path.
// The HTML is intentionally NOT pre-cached so we always get the latest from the network.
const ASSETS_TO_CACHE = [];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      if (ASSETS_TO_CACHE.length) return cache.addAll(ASSETS_TO_CACHE);
    }).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(name => (name !== CACHE_NAME) ? caches.delete(name) : null)
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = event.request.url;

  // Firebase: always network, never cache
  if (url.includes('firebase') || url.includes('firebaseio.com')) {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response('Offline - Firebase unavailable', { status: 503 })
      )
    );
    return;
  }

  // HTML navigations: ALWAYS network-first with cache: 'no-store' to bypass
  // the HTTP cache (browser may otherwise serve a stale GitHub Pages copy).
  const isHtmlNav = event.request.mode === 'navigate' ||
                    (event.request.headers.get('accept') || '').includes('text/html');

  if (isHtmlNav) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .catch(() => caches.match(event.request).then(r => r || new Response(
          '<!doctype html><meta charset="utf-8"><title>Hors-ligne</title><body style="font-family:sans-serif;padding:24px"><h2>Hors-ligne</h2><p>Reconnecte-toi à internet pour charger l\'app.</p>',
          { status: 503, headers: { 'Content-Type': 'text/html' } }
        )))
    );
    return;
  }

  // Other assets: network-first, cache successful responses for offline use
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone)).catch(() => {});
        }
        return response;
      })
      .catch(() =>
        caches.match(event.request).then(r => r || new Response('Offline', { status: 503 }))
      )
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
