const staticCacheName = 'site-static-v4';
const dynamicCacheName = 'site-dynamic-v4';
const assets = [
     './',
     './index.html',
     './JavaScript/application.js',
     './JavaScript/userinterface.js',
     './style.css',
     './pictures/dish.png',
     'https://fonts.googleapis.com/icon?family=Material+Icons',
     'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
     './HyperTextMarkupLanguage/fallback.html'
];
const limitCacheSize = (name,size) => {
     caches.open(name).then(cache => {
          cache.keys().then(keys => {
               if(keys.length > size){
                    cache.delete(keys[0]).then(limitCacheSize(name,size));
               }
          });
     });
};
self.addEventListener('install',event => {
     event.waitUntil(caches.open(staticCacheName).then((cache) => {
          console.log('Caching Shell Assets');
          cache.addAll(assets);
     }));
});
self.addEventListener('activate',event => {
     event.waitUntil(caches.keys().then(keys => {
          return Promise.all(keys.filter(key => key !== staticCacheName && key !== dynamicCacheName).map(key => caches.delete(key)));
     }));
});
self.addEventListener('fetch',event => {
     if(event.request.url.indexOf('firestore.googleapis.com') === -1){
          event.respondWith(caches.match(event.request).then(cacheResponse => {
               return cacheResponse || fetch(event.request).then(fetchResponse => {
                    return caches.open(dynamicCacheName).then(cache => {
                         cache.put(event.request.url,fetchResponse.clone());
                         limitCacheSize(dynamicCacheName,15);
                         return fetchResponse;
                    });
               });
          }).catch(() => {
               if(event.request.url.indexOf('.html') > -1){
                    return caches.match('./HyperTextMarkupLanguage/fallback.html');
               }
          }));
     }
});