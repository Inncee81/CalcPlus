const cacheName = "v1";
const cacheAssets = [
    'assets/CPquery.js',
    'assets/Library.js',
    'assets/logo.png',
    'assets/Options.js',
    'index.html',
    'AboutLibrary/index.html',
    'CPQuerySource/index.html',
    'LibrarySource/index.html',
    'PageOptions/index.html',
    'PreviewLibrary/index.html',
    '/',
    'AboutLibrary/',
    'CPQuerySource/',
    'LibrarySource/',
    'PageOptions/',
    'PreviewLibrary/',
    'LICENSE'
];

self.addEventListener('install', e => {
    console.info('Service Worker: Installed');
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.info('Service Worker: Caching Files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', e => {
    console.info('Service Worker: Activated');
    e.waitUntil(
        caches.keys().then(cacheName => {
            return Promise.all(
                cacheName.map(cache => {
                    if (cache != cacheName) {
                        console.info('Service Worker: Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

self.addEventListener('fetch', e => {
    console.info('Service Worker: Fetching');
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});