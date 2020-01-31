import {Feature} from "../../utils/feature";

export default new Feature({
  id: 'storage-quota',
  name: 'Storage Quotas',
  description: [
    `There were several attempts made, mostly by Google Chrome, to allow Web applications to query the system for the size of the storage space
         currently used and available for the application. The most recent one, <b>Quota Estimation API</b>, includes also a way to request the stored data to be persisted by the browser that would otherwise be wiped out in case the system signalled memory pressure. 
         The permission to request this persistent storage capability might be granted by the browser based on the heuristic (i.e. Google Chrome) or might require explicit user consent (i.e. Firefox).`,
    `The older implementation, supported only in Chrome with <code>webkit-</code> prefix, maintained a separation between the temporary and persistent storage
         and allowed the Web applications to request for more storage space, if needed.`
  ],
  api: `<dl>
        <dt><code>navigator.storage.estimate()</code></dt>
        <dd>Returns a <code>Promise</code> resolved with the storage space estimated values; see below.</dd>
        <dt><code>estimate.usage</code></dt>
        <dd>Returns the estimated size of the storage currently used by the application, in bytes.</dd>
        <dt><code>estimate.quota</code></dt>
        <dd>Returns the estimated total size of the storage available for the application, in bytes, including already used.</dd>
          
        <dt><code>navigator.storage.persisted()</code></dt>
        <dd>Returns a <code>Promise</code> resolved with a boolean informing whether the persistent storage permission was already requested and granted.</dd>
        <dt><code>navigator.storage.persist()</code></dt>
        <dd>Requests the persistent storage capability. Returns a <code>Promise</code> resolved with a boolean informing whether the persistent storage permission was granted (either via heuristic or user consent).</dd>
      </dl>`,
  tests: [
    Feature.containedIn('navigator.storage', typeof(window) !== 'undefined' && (window.navigator || {}).storage, 'estimate'),
    Feature.containedIn('navigator.storage', typeof(window) !== 'undefined' && (window.navigator || {}).storage, 'persist'),
    Feature.navigatorContains('persistentStorage', false)
  ],
  demo: {
    html: `<p>Estimated storage usage is <b id="usage">unknown</b> bytes.</p>
<p>Estimated storage quota is <b id="quota">unknown</b> bytes.</p>
<p>Estimated usage is <b id="percent">unknown</b>%.</p>
<p>Persistent storage status is <b id="persisted">unknown</b>.</p>
<p><button onclick="requestPersistence()">Request persistent storage</button></p>`,
    js: `if ('storage' in navigator && 'estimate' in navigator.storage) {
  navigator.storage.estimate()
    .then(estimate => {
      document.getElementById('usage').innerHTML = estimate.usage;
      document.getElementById('quota').innerHTML = estimate.quota;
      document.getElementById('percent').innerHTML = (estimate.usage * 100 / estimate.quota).toFixed(0);
    });
}

if ('storage' in navigator && 'persisted' in navigator.storage) {
  navigator.storage.persisted()
    .then(persisted => {
      document.getElementById('persisted').innerHTML = persisted ? 'persisted' : 'not persisted';
    });
}

function requestPersistence() {
  if ('storage' in navigator && 'persist' in navigator.storage) {
    navigator.storage.persist()
      .then(persisted => {
        document.getElementById('persisted').innerHTML = persisted ? 'persisted' : 'not persisted';
      });
  }
}`
  },
  // caniuse: 'mdn-api_storagequota',
  links: [
    {url: 'https://storage.spec.whatwg.org/', title: 'Specification Draft'},
    {url: 'http://www.html5rocks.com/en/tutorials/offline/quota-research/', title: 'Quota limitations analysis'}
  ]
})
