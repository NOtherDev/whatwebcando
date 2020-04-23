import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'offline',
  name: 'Offline Mode',
  description: [
    `Web applications can provide the offline experience using two techniques. The older implementation,
        <b>Application Cache</b>, is <a href="http://caniuse.com/#feat=offline-apps" target="_blank" rel="noopener">widely implemented</a> in the browsers,
        but is now in the process of deprecation due to <a href="http://alistapart.com/article/application-cache-is-a-douchebag" target="_blank" rel="noopener">various
        conceptual and design flaws</a>. It is not covered here.`,
    `The modern alternative is called <b>Cache API</b> and is available within Service Worker – the separate code unit the Web applications running on HTTPS can request the browser to install. 
        This unit is then run in separation from the owning Web application, communicating with it via events. Service Worker is the basic building block of the 
        <b><a href="https://developers.google.com/web/progressive-web-apps" target="_blank" rel="noopener">Progressive Web Apps</a></b> (PWA) idea.
        Besides being the enabler for multiple complex APIs like <a href="/push-notifications.html">Push Notifications</a>, <a href="/background-sync.html">Background Sync</a>
        or <a href="/geofencing.html">Geofencing</a>, it can work as a fully featured network proxy. It can intercept all the HTTP requests, alter its content or behaviors,
        or - most notably - manage offline caching.`,
    `The content being added to Cache API might be additionally indexed and exposed to the browser using <b>Content Indexing API</b>. As of Spring 2020, this is an early-stage proposal by Google Chrome,
        available only in this browser on Android via <a href="https://developers.chrome.com/origintrials/#/view_trial/2272066012008415233" target="_blank" rel="noopener">Origin Trial experimentation</a>.
        The entries added to the index should be cached in Cache API and served offline via Service Worker. The browser might then present the indexed entries for the user while being offline.`,
  ],
  api: `<p><b>Within the owning Web application - Installation</b></p>
    <dl>
      <dt><code>navigator.serviceWorker.register(path)</code></dt>
      <dd>Installs the Service Worker code available under <code>path</code>. Returns a <code>Promise</code>.</dd>
      <dt><code>navigator.serviceWorker.ready</code></dt>
      <dd>Returns a <code>Promise</code> resolved with <code>serviceWorkerRegistration</code> when the Worker is initialized.</dd>
      <dt><code>serviceWorkerRegistration.update()</code></dt>
      <dd>Checks the server for an updated version of the Service Worker without consulting caches.</dd>
      <dt><code>serviceWorkerRegistration.unregister()</code></dt>
      <dd>Uninstalls the Service Worker.</dd>
    </dl>
    
    <p><b>Within the Service Worker instance - Cache prefetch</b></p>
    <pre><code>self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('my-cache-v1')
      .then(function (cache) {
        return cache.addAll(['/', '/styles/main.css', '/scripts/main.js']);
      })
  );
});</code></pre>
    <dl>
      <dt><code>self.addEventListener('install', listener)</code></dt>
      <dd>An event fired within the Service Worker when it is being installed. Useful to prefetch the resources needed in the offline mode and to prefill the cache.</dd>
      <dt><code>event.waitUntil(promise)</code></dt>
      <dd>An install event method that expects a <code>Promise</code> which signals the end of the worker's installation phase when resolved.</dd>
      <dt><code>caches.open(cacheName)</code></dt>
      <dd>Returns a <code>Promise</code> resolved with the named cache accessor object that is able to keep the resources needed for the offline mode.</dd>
      <dt><code>cache.addAll(urls)</code></dt>
      <dd>Adds all the resources specified with the URLs to the named cache for the future, possibly offline, use.</dd>
    </dl>
    
    <p><b>Within the Service Worker instance - Requests cache</b></p>
    <pre><code>function isSuccessful(response) {
  return response &&
    response.status === 200 &&
    response.type === 'basic';
}

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response; // Cache hit
        }

        return fetch(event.request.clone())
          .then(function (response) {
            if (!isSuccessful(response)) {
              return response;
            }

            caches.open(CACHE_NAME)
              .then(function (cache) {
                cache.put(event.request, response.clone());
              });

            return response;
          }
        );
      })
    );
});</code></pre>
    <dl>
      <dt><code>self.addEventListener('fetch', listener)</code></dt>
      <dd>An event fired within the Service Worker whenever any of its related browser tabs have issued a HTTP request. Useful to serve already cached response
        or intercept and cache the incoming response.</dd>
      <dt><code>event.respondWith(promise)</code></dt>
      <dd>A fetch event method that expects a <code>Promise</code> which resolves with the request data to be returned to the requesting browser tab.</dd>
      <dt><code>cache.put(request, response)</code></dt>
      <dd>Adds the specified response for the request to the named cache for the future, possibly offline, use.</dd>
      <dt><code>caches.match(event.request)</code></dt>
      <dd>Returns a <code>Promise</code> resolved when the <code>fetch</code> event represents a request to the resource already cached within
        the Service Worker's cache.</dd>
    </dl>
    
    <p>See also <b><a href="/service-worker.js" target="_blank">this website's own Service Worker implementation</a></b>.</p>

    <p><b>Content Indexing API (Google Chrome experimentation)</b></p>
    <dl>
      <dt><code>serviceWorkerRegistration.index.add({id, url, title, description, icons, category})</code></dt>
      <dd>Adds an entry identified by <code>id</code> to the offline index, with its metadata. It does not cache the entry – it needs to be separately added using Cache API.</dd>
      <dt><code>serviceWorkerRegistration.index.delete(id)</code></dt>
      <dd>Removes the previously added entry identified by <code>id</code> from the offline index.</dd>
      <dt><code>serviceWorkerRegistration.index.getAll()</code></dt>
      <dd>Returns a <code>Promise</code> resolved with the list of entries previously added to the index.</dd>
      <dt><code>self.addEventListener('contentdelete', listener)</code></dt>
      <dd>An event fired within the Service Worker when the entry from the index has been deleted by the user. Useful for removing the resources from the Cache API.</dd>
    </dl>`,
  caniuse: 'serviceworkers',
  tests: [
    Feature.navigatorContains('serviceWorker'),
    Feature.windowContains('caches'),
    Feature.serviceWorkerRegistrationContains('index'),
  ],
  links: [
    {url: 'http://www.w3.org/TR/service-workers/', title: 'Service Workers Specification Draft'},
    {
      url: 'https://developers.google.com/web/fundamentals/primers/service-workers',
      title: 'Service Workers: an Introduction'
    },
    {url: 'https://jakearchibald.com/2014/offline-cookbook/', title: 'The offline cookbook'},
    {
      url: 'https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker_API',
      title: 'ServiceWorker API - MDN docs'
    },
    {
      url: 'https://googlechrome.github.io/samples/service-worker/prefetch/index.html',
      title: 'Service Worker Sample: Pre-fetching Resources During Registration'
    },
    {
      url: 'https://medium.com/@slsoftworks/beyond-offline-bf5c013ec8e7',
      title: 'Beyond Offline: Using a custom service worker to expand on your browser’s capabilities'
    },
    {
      url: 'https://ponyfoo.com/articles/serviceworker-revolution',
      title: 'ServiceWorker: Revolution of the Web Platform'
    },
    {
      url: 'https://jakearchibald.github.io/isserviceworkerready/resources.html',
      title: 'Is ServiceWorker Ready? - Jake Archibald'
    },
    {
      url: 'https://css-tricks.com/serviceworker-for-offline/',
      title: 'Making a Simple Site Work Offline with ServiceWorker'
    },
    {
      url: 'https://web.dev/content-indexing-api/',
      title: 'Indexing your offline-capable pages with the Content Indexing API'
    },
  ]
})
