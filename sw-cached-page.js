const cacheName = 'v1';
const cacheAssets = ['index.html','about.html','style.css','script.js'];
self.addEventListener('install',e => {
     console.log('service worker: installed');
     e.waitUntil(caches.open(cacheName).then(cache => {
                    console.log('service worker: catching files');
                    cache.addAll(cacheAssets);
               }).then(() => self.skipWaiting()));
});
self.addEventListener('activate',e => {
     console.log('service worker: activated');
     e.waitUntil(caches.keys().then(cacheNames => {
          return Promise.all(cacheNames.map(cache => {
               if(cache !== cacheName){
                    console.log('service worker: cleaning old cache');
                    return caches.delete(cache);
               }
          }));
     }));
});
self.addEventListener('fetch',e => {
     console.log('service worker: fetching');
     e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});