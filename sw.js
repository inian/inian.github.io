console.log("hi from worker");

var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/engineers.sg/presenters.html',
  '/engineers.sg/assets/application-fb4db91d78f751f730cb08787d44431b053e157a8cbf135ed081f1b9ee6fab28.js',
  '/engineers.sg/assets/application-90e67de72dc561524e714564f13f2c07f140e89d55383822a61fe6b2d8e7de68.css',
  '/cat.png'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {

  if (/\.jpg$|.png$/.test(event.request.url)) {
    console.log(event.request.url);
    var req = event.request.clone();

    // Build the return URL
    var returnUrl = "/cat.png";

    event.respondWith(
      fetch(returnUrl, {
        mode: 'no-cors'
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request).catch((err) => console.log(err));
      })
    );
  }


});
