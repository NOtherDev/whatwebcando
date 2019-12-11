import {Feature} from "../../utils/feature";

export default new Feature({
  id: 'storage',
  name: 'Offline Storage',
  description: [
    `There were <a href="http://diveinto.html5doctor.com/storage.html" target="_blank">several iterations</a> of prototypes
          and standardized technologies for offline storage capabilities for Web applications. First attempts were either just hacky workarounds
          (like to store data in cookies) or required additional software (like Flash or Google Gears). Later, Web SQL idea, basically to include SQLite
          natively within a browser, was coined and <a href="http://caniuse.com/#feat=sql-storage" target="_blank">implemented throughout some browsers</a>,
          but deprecated later <a href="https://hacks.mozilla.org/2010/06/beyond-html5-database-apis-and-the-road-to-indexeddb/" target="_blank">due to
          the standardization difficulties</a>.`,
    `Right now there are at least three distinct and independent technologies standardized and available. The simplest one is <b>Web Storage</b> - 
          a key-value string storage, allowing Web applications to store data either persistently and cross-window (<code>localStorage</code>) 
          or for a single session in a single browser tab (<code>sessionStorage</code>). The more sophisticated <b>IndexedDB</b> is a low-level API
          over database-like structures with transactions and cursors iterating by indexes. The newest addition - <b>Cache API</b> is a specialized
          solution to keep <code>Request</code>/<code>Response</code> pairs, useful mostly within <a href="/offline.html">Service Worker</a> implementation.`,
    `Live example and usage data shown here are referring to <b>Web Storage</b> engine. For details on IndexedDB,
          refer to <a href="http://caniuse.com/#feat=indexeddb" target="_blank">caniuse.com</a>.`,
    `The actual persistence of data stored in any of the persistent stores (be it <code>localStorage</code>, IndexedDB or Cache API) is browser-managed
          and by default might be wiped out without end-user consent in case of memory pressure conditions. To address this problem, <b>Storage API</b>
          was introduced - it gives the Web applications a method to store the data in a fully reliable way if the user permits it to do so. Chrome's
          implementation grants this permission based on user-engagement-based heuristic, while Firefox asks for the permission explicitly.`
  ],
  api: `<p><b>Web Storage API</b></p>
      <dl>
        <dt><code>window.sessionStorage</code></dt>
        <dd>Gives an access to the Web Storage engine with per-session objects lifetime.</dd>
        <dt><code>window.localStorage</code></dt>
        <dd>Gives an access to the Web Storage engine with persistent objects lifetime.</dd>
        <dt><code>storage.setItem(key, value)</code></dt>
        <dd>Saves the <code>value</code> string under the <code>key</code> in the selected storage engine.</dd>
        <dt><code>storage.getItem(key)</code></dt>
        <dd>Returns the string value stored under the <code>key</code> in the selected storage engine.</dd>
        <dt><code>storage.removeItem(key)</code></dt>
        <dd>Removes the string value stored under the <code>key</code> from the selected storage engine.</dd>
        <dt><code>storage.clear()</code></dt>
        <dd>Removes all the string values stored in the selected storage engine.</dd>
        <dt><code>window.addEventListener('storage', listener)</code></dt>
        <dd>An event fired when the data stored in either <code>sessionStorage</code> or <code>localStorage</code> has been changed externally.</dd>
      </dl>
      <p><b>IndexedDB</b></p>
      <dl>
        <dt><code>let openRequest = window.indexedDB.open(name, version)</code></dt>
        <dd>Triggers opening a database connection to either existing or newly-created database. 
          Returns an object that fires <code>success</code> event when the connection is established.</dd>
        <dt><code>let db = openRequest.result</code></dt>
        <dd>Gives an access to the open database connection instance - available after <code>success</code> was fired.</dd>
        <dt><code>db.createObjectStore(storeName, options)</code></dt>
        <dd>Creates a named container (object store) for objects in the opened database.</dd>
        <dt><code>let tx = db.transaction(storeName)</code></dt>
        <dd>Opens a data-reading or data-manipulation transaction scoped to the given object store(s).</dd>
        <dt><code>tx.objectStore.put(value, key)</code></dt>
        <dd>Saves the <code>value</code> in the currently opened object store.</dd>
        <dt><code>tx.objectStore.get(key)</code></dt>
        <dd>Gets the object stored under a <code>key</code> in the currently opened object store.</dd>
        <dt><code>tx.createIndex(name, keyPath, options)</code></dt>
        <dd>Creates an index that allows to seek for the stored objects using the property specified via <code>keyPath</code>.</dd>
        <dt><code>tx.index(name).get(key)</code></dt>
        <dd>Gets the object having the particular index <code>keyPath</code> equal to the <code>key</code> specified.</dd>
      </dl>
      <p><b>Cache API</b></p>
      <dl>
        <dt><code>let cache = window.caches.open(key)</code></dt>
        <dd>Returns a <code>Promise</code> that resolves to a store "bucket" object giving an access to the cached <code>Response</code> objects.</dd>
        <dt><code>cache.put(request, response)</code></dt>
        <dd>Saves the <code>Response</code> object to the cache with its corresponding <code>Request</code> object.</dd>
        <dt><code>cache.match(request, option)</code></dt>
        <dd>Returns a <code>Promise</code> that resolves to the <code>Response</code> object matching the specified <code>Request</code> 
          (with the <code>options</code>-controlled level of exactness) found in the opened cache "bucket".</dd>
        <dt><code>cache.delete(request, option)</code></dt>
        <dd>Removes the <code>Response</code> object matching the specified <code>Request</code>
          (with the <code>options</code>-controlled level of exactness) found in the opened cache "bucket".</dd>
      </dl>
      <p><b>Storage API (persistence permission)</b></p>
      <dl>
        <dt><code>navigator.storage.persist()</code></dt>
        <dd>Requests a permission to turn the data saved by the Web application into persistent data. 
          Returns a <code>Promise</code> that resolves with a boolean value indicating whether the permission was granted.</dd>
        <dt><code>navigator.storage.persisted()</code></dt>
        <dd>Returns a <code>Promise</code> that resolves with a boolean value indicating whether the persistent storage permission was already granted.</dd>
      </dl>`,
  caniuse: 'namevalue-storage',
  tests: [
    Feature.windowContains('sessionStorage'),
    Feature.windowContains('localStorage'),
    Feature.windowContains('indexedDB'),
    Feature.windowContains('caches'),
    Feature.navigatorContains('storage')
  ],
  demo: {
    html: `<p>
  <label>Engine</label>
</p>
<div role="group" id="selectEngine">
  <input type="radio" name="engine" value="localStorage" checked/> Persistent Storage
  <input type="radio" name="engine" value="sessionStorage"/> Per-Session Storage
</div>

<p>
  <label for="value">Value for <code>myKey</code></label>
  <input type="text" id="value">
</p>

<p>Open the example in another tab and change the value there to see the synchronization via <code>storage</code> event.</p>
<div id="target"></div>`,
    js: `if ('localStorage' in window || 'sessionStorage' in window) {
  var selectedEngine;

  var logTarget = document.getElementById('target');
  var valueInput = document.getElementById('value');

  var reloadInputValue = function () {
  console.log(selectedEngine, window[selectedEngine].getItem('myKey'))
    valueInput.value = window[selectedEngine].getItem('myKey') || '';
  }
  
  var selectEngine = function (engine) {
    selectedEngine = engine;
    reloadInputValue();
  };

  function handleChange(change) {
    var timeBadge = new Date().toTimeString().split(' ')[0];
    var newState = document.createElement('p');
    newState.innerHTML = '<span class="badge">' + timeBadge + '</span> ' + change + '.';
    logTarget.appendChild(newState);
  }

  var radios = document.querySelectorAll('#selectEngine input');
  for (var i = 0; i < radios.length; ++i) {
    radios[i].addEventListener('change', function () {
      selectEngine(this.value)
    });
  }
  
  selectEngine('localStorage');

  valueInput.addEventListener('keyup', function () {
    window[selectedEngine].setItem('myKey', this.value);
  });

  var onStorageChanged = function (change) {
    var engine = change.storageArea === window.localStorage ? 'localStorage' : 'sessionStorage';
    handleChange('External change in <b>' + engine + '</b>: key <b>' + change.key + '</b> changed from <b>' + change.oldValue + '</b> to <b>' + change.newValue + '</b>');
    if (engine === selectedEngine) {
      reloadInputValue();
    }
  }

  window.addEventListener('storage', onStorageChanged);
}`,
    jsOnExit: `window.removeEventListener('storage', onStorageChanged);`
  },
  links: [
    {url: 'https://html.spec.whatwg.org/multipage/webstorage.html', title: 'Web Storage Specification'},
    {url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API', title: 'MDN: Web Storage API'},
    {url: 'https://www.w3.org/TR/IndexedDB/', title: 'IndexedDB Specification'},
    {url: 'https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API', title: 'MDN: IndexedDB API'},
    {url: 'https://w3c.github.io/ServiceWorker/v1/#cache', title: 'Cache API Specification'},
    {url: 'https://developer.mozilla.org/en-US/docs/Web/API/Cache', title: 'MDN: Cache API'},
    {url: 'https://storage.spec.whatwg.org/', title: 'Storage API Specification'},
    {
      url: 'https://developers.google.com/web/updates/2016/06/persistent-storage',
      title: 'Google Developers: Persistent Storage'
    }
  ]
})
