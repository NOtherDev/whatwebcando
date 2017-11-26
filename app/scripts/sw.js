importScripts('/scripts/sw-offline-google-analytics/build/importScripts/sw-offline-google-analytics.prod.v0.0.25.js');
goog.offlineGoogleAnalytics.initialize();

self.addEventListener('install', function (event) {
  self.skipWaiting();

  event.waitUntil(
    caches.open(VERSION).then(function (cache) {
      let files = [
        '/',
        '/index.html',
        '/scripts/main.js',
        '/scripts/vendor.js',
        '/styles/main.css',
        '/styles/layout.css',
        '/styles/vendor.css',
        '/images/logo.svg',
        '/fonts/Material-Design-Icons.woff',
        'https://fonts.gstatic.com/s/lato/v13/MDadn8DQ_3oT6kvnUq_2r_esZW2xOQ-xsNqO47m55DA.woff2',
        'https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.23.0/polyfill.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/chartist/0.9.8/chartist.min.js'
      ];

      groups.forEach(function (group) {
        group.features.forEach(function (feature) {
          files.push(`/${feature.id}.html`);
        });
      });

      return cache.addAll(files);
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== VERSION) {
          return caches.delete(key);
        }
      }));
    })
  );
});

const isCacheable = request => request.mode === 'navigate' || request.url.indexOf('https://raw.githubusercontent.com') === 0;

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open(VERSION)
      .then(function (cache) {
        // cache first, fallback to network
        return cache.match(event.request, {ignoreSearch: true})
          .then(function (response) {
            if (response) {
              return response;
            }

            return fetch(event.request)
              .then(function (fetchResponse) {
                // cache already fetched data
                if (fetchResponse && fetchResponse.status === 200 && isCacheable(event.request)) {
                  cache.put(event.request, fetchResponse.clone());
                }
                return fetchResponse;
              });
          });
      })
  );
});
