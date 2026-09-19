// Service Worker for ColiFem 30D PWA
// Version 2.1: Network-First strategy to eliminate blank white screens and stale bundles
const CACHE_NAME = 'colifem-30d-v2';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/colshopi-logo.png',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png',
  '/favicon.png',
  '/icon.svg'
];

// Install: Cache critical static assets resiliently
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Use allSettled logic to avoid install failure if an asset fails
      return Promise.allSettled(
        STATIC_ASSETS.map((asset) =>
          cache.add(asset).catch((err) => {
            console.warn(`[SW] Could not pre-cache asset ${asset}:`, err);
          })
        )
      );
    })
  );
  self.skipWaiting();
});

// Activate: Delete ALL legacy caches immediately and claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log(`[SW] Purging outdated cache: ${key}`);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Push notification handling
self.addEventListener('push', (event) => {
  let data = {
    title: 'ColiFem 30D - Mensaje de Bianka 💚',
    body: 'Hola hermosa, recuerda tu dosis de Coli Plus y tu hidratación con ColShopi Tienda.',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    data: { url: '/' }
  };

  if (event.data) {
    try {
      data = { ...data, ...event.data.json() };
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/icon-192.png',
    badge: data.badge || '/icon-192.png',
    vibrate: [100, 50, 100],
    data: data.data || { url: '/' },
    actions: [
      { action: 'explore', title: 'Abrir Protocolo' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

// Fetch: Resilient Network-First strategy
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // 1. Never intercept non-GET requests
  if (req.method !== 'GET') {
    return;
  }

  // 2. Never intercept API calls, audio streaming, or internal Vite dev modules
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.includes('/@vite') ||
    url.pathname.includes('/@id') ||
    url.pathname.includes('/src/') ||
    url.pathname.includes('node_modules') ||
    url.hostname.includes('backblazeb2.com') ||
    url.pathname.endsWith('.mp3') ||
    !url.protocol.startsWith('http')
  ) {
    return;
  }

  // 3. Navigation requests (Opening the app / refreshing the page):
  // ALWAYS Network-First! Never serve stale HTML that references old JS hashes.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put('/index.html', clone);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          console.warn('[SW] Offline navigate fallback');
          const cached = await caches.match('/index.html');
          if (cached) return cached;
          const cachedRoot = await caches.match('/');
          if (cachedRoot) return cachedRoot;
          return new Response('Sin conexión a internet. Abre la app cuando tengas señal.', {
            status: 503,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
          });
        })
    );
    return;
  }

  // 4. Static assets (JS, CSS, images, icons):
  // Network-First with cache fallback and dynamic caching
  event.respondWith(
    fetch(req)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, clone);
          });
        }
        return networkResponse;
      })
      .catch(async () => {
        // Network failed (offline or server blip) - try cache
        const cached = await caches.match(req);
        if (cached) {
          return cached;
        }
        // If not in cache and network failed, let it propagate without returning undefined
        return new Response('', { status: 408, statusText: 'Request timed out' });
      })
  );
});
