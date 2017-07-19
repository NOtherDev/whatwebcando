
this.addEventListener('install', function (event) {
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
        'https://fonts.gstatic.com/s/lato/v13/MDadn8DQ_3oT6kvnUq_2r_esZW2xOQ-xsNqO47m55DA.woff2'
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

this.addEventListener('activate', function (event) {
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

this.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open(VERSION)
      .then(function (cache) {
        if (event.request.mode === 'navigate') {
  	    // network first, fallback to cache - to make sure html updates like new script & style revved urls are handled
  	      return fetch(event.request)
  		    .catch(function () {
      		  return cache.match(event.request);
    	    });
	    }

	    // else cache first, fallback to network
        return cache.match(event.request, {ignoreSearch: true})
          .then(function (response) {
            if (response) {
              return response;
            }

            return fetch(event.request)
              .then(function (fetchResponse) {
              	// cache already fetched caniuse data
                if (fetchResponse && fetchResponse.status === 200 && event.request.url.indexOf('https://raw.githubusercontent.com') === 0) {
                  cache.put(event.request, fetchResponse.clone());
                }
                return fetchResponse;
              });
          });
      })
  );
});
