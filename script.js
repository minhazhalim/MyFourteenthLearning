if('serviceWorker' in navigator){
     window.addEventListener('load',() => {
          navigator.serviceWorker
               .register('sw-cached-page.js')
               .then(reg => console.log('service worker: registered (page)'))
               .catch(error => console.log(`service worker: error: ${error}`));
     });
}