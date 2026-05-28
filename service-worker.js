// Service worker for CCNA Lab 5 PWA.
// Strategy: cache-first w/ network revalidate. Keeps the app usable offline once loaded.
// Bump CACHE_VERSION whenever core assets change to force re-fetch.

const CACHE_VERSION = 'ccna-lab5-v1';
const CORE_ASSETS = [
  'network-lab.html',
  'js/lab-engine.js',
  'js/nav.js',
  'js/store.js',
  'js/tutor.js',
  'css/shared.css',
  'favicon.svg',
  'manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      // Cache best-effort — don't fail install if one asset 404s.
      return Promise.allSettled(CORE_ASSETS.map((u) => cache.add(u)));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  // Only handle same-origin requests; bypass fonts.googleapis etc.
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      const networkFetch = fetch(req)
        .then((resp) => {
          if (resp && resp.status === 200) {
            const copy = resp.clone();
            caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
          }
          return resp;
        })
        .catch(() => cached);
      return cached || networkFetch;
    })
  );
});
