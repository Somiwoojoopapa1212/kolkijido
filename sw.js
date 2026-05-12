// v:2026-05-12T02:30:07
const CACHE = 'kolkijido-v:2026-05-12T02:30:07';

self.addEventListener('install', e => {
  self.skipWaiting();
});
self.addEventListener('message', e => { if (e.data?.type === 'SKIP_WAITING') self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = e.request.url;
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }
  if (url.includes('firebase') || url.includes('googleapis') || url.includes('openstreetmap') ||
      url.includes('cartocdn') || url.includes('unpkg') || url.includes('google') ||
      url.includes('kakao') || url.includes('fonts')) {
    e.respondWith(fetch(e.request)); return;
  }
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request)));
});
