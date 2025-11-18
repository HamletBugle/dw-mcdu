const CACHE = "mcdu-cache-v2";
const FILES = [
    "/",
    "/index.html",
    "/manifest.json",
    "/icon-192.png",
    "/icon-512.png",
    "/sw.js"
];

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE).then(cache => {
            return cache.addAll(FILES);
        })
    );
});

self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(k => {
                    if (k !== CACHE) return caches.delete(k);
                })
            );
        })
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then(cached => {
            return cached || fetch(e.request).catch(() => cached);
        })
    );
});

