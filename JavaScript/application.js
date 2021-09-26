if('serviceWorker' in navigator){
     navigator.serviceWorker.register('service-worker.js').then(registration => {
          console.log('Service Worker Registered',registration);
     }).catch(error => {
          console.log('Service Worker Not Registered',error);
     });
}