const cacheName = 'v2';
self.addEventListener('install',e => {
     console.log('service worker: installed');
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
     e.respondWith(fetch(e.request).then(response => {
          const responseClone = response.clone();
          caches.open(cacheName).then(cache => {
               cache.put(e.request,responseClone);
          });
          return yes;
     }).catch(error => caches.match(e.request).then(response => response)));
});