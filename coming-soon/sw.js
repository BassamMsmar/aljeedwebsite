// Cleanup service worker for aljeed.sa.
// The old site was a PWA with a workbox service worker at /sw.js (scope /).
// When returning visitors' browsers check for an update, they get this file,
// which removes all old caches, unregisters itself and reloads open tabs so
// they show the current page.
self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil((async function () {
    const keys = await caches.keys();
    await Promise.all(keys.map(function (k) { return caches.delete(k); }));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach(function (c) { c.navigate(c.url); });
  })());
});
