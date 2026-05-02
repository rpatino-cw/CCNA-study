/* ═══════════════════════════════════════════════════
   Ekere Labs — Service Worker
   Strategy: Cache-first for app shell, network-first
   for external resources (fonts, API)
   ═══════════════════════════════════════════════════ */

const CACHE_NAME    = 'ekere-labs-v1';
const OFFLINE_PAGE  = '/';

/* Resources to pre-cache on install */
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

/* External origins — always try network first */
const NETWORK_FIRST_ORIGINS = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'api.anthropic.com'
];

/* ── Install: pre-cache app shell ──────────────────── */
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(PRECACHE_URLS).catch(function(err) {
        console.warn('SW pre-cache partial failure (normal on first run):', err);
      });
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

/* ── Activate: clean up old caches ─────────────────── */
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function(name) { return name !== CACHE_NAME; })
          .map(function(name)    { return caches.delete(name); })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

/* ── Fetch: cache-first for app, network-first for external ── */
self.addEventListener('fetch', function(event) {
  const url = new URL(event.request.url);

  /* Skip non-GET and chrome-extension requests */
  if (event.request.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:') return;

  /* Network-first for external origins (fonts, API calls) */
  const isExternal = NETWORK_FIRST_ORIGINS.some(function(origin) {
    return url.hostname.includes(origin);
  });

  if (isExternal) {
    event.respondWith(
      fetch(event.request)
        .then(function(response) {
          /* Cache a copy of font responses */
          if (response.ok && url.hostname.includes('gstatic.com')) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, clone);
            });
          }
          return response;
        })
        .catch(function() {
          /* Fall back to cache if network fails */
          return caches.match(event.request);
        })
    );
    return;
  }

  /* Cache-first for everything else (app shell) */
  event.respondWith(
    caches.match(event.request).then(function(cached) {
      if (cached) return cached;

      return fetch(event.request).then(function(response) {
        /* Only cache valid same-origin responses */
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, clone);
        });
        return response;
      }).catch(function() {
        /* Offline fallback: return the cached root page */
        return caches.match(OFFLINE_PAGE);
      });
    })
  );
});

/* ── Background sync: notify clients of updates ─────── */
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
