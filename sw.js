// v:2026-04-29T07:49:43
const CACHE = 'kolkijido-v:2026-04-29T07:49:43';
const ASSETS = ['/kolkijido/', '/kolkijido/index.html', '/kolkijido/manifest.json', '/kolkijido/firebase-config.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('message', e => { if (e.data?.type === 'SKIP_WAITING') self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.url.includes('firebase') || e.request.url.includes('googleapis') || e.request.url.includes('kakao') || e.request.url.includes('openstreetmap')) {
    e.respondWith(fetch(e.request)); return;
  }
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request)));
});
