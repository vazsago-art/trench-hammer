// Trench Hammer Army Builder - Service Worker
// Offline-first strategy: cache-first for assets, network-first for navigation

const CACHE_NAME = 'trench-hammer-v23';
const ASSETS_TO_CACHE = [
  '/trench-hammer/',
  '/trench-hammer/index.html',
  '/trench-hammer/manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {
        // Non-fatal — assets may not exist yet during first build
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET and non-same-origin requests
  if (event.request.method !== 'GET' || url.origin !== location.origin) return;

  // Network-first for HTML navigation
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((c) => c.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Network-first for JS/CSS/fonts/images (ensures fresh deploys are picked up)
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((c) => c.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
