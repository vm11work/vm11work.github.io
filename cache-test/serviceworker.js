const cacheName = 'v2';
const resourcesToPrecache = [
    // '/',
    'index.html',
    'contact.html',
    'style.css',
    // 'images/space1.jpg',
    // 'images/space2.jpg',
];

// 등록
self.addEventListener('install', event => {
    console.log('Service worker install event !');
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.log('service worker : caching files');

            cache.addAll(resourcesToPrecache);
        })
        .then(()=> self.skipWaiting())
    );
});

self.addEventListener('activate', e=> {
console.log('Service worker : Activated');
e.waitUntil(
    caches.keys().then(cacheName => {
        return Promise.all(
            cacheName.map(cache=>
                {
                    if(cache != cacheName)
                    {
                        console.log('Service Worker : clearing old cache');
                        return caches.delete(caches);

                    }
                })
        );
    })
);
});


// 불러오기
// self.addEventListener('fetch', event => {
//     console.log('service woker : Fetching!');
//     event.respondWith(caches.match(event.request)
//     .then(cachedResponse=>
//         {  return cachedResponse || fetch(event.request);})
//     );
// });
self.addEventListener('fetch', e => {
    console.log('service worker : Fetching');
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request)));
});