if('serviceWorker' in navigator){
     navigator.serviceWorker.register('./serviceworker.js').then(registration => {
          console.log('ServiceWorker Registered');
          console.log(registration);
     }).catch(error => {
          console.log('ServiceWorker Registration Failed!');
          console.log(error);
     });
}
