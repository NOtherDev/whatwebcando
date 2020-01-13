import {Feature} from "../../utils/feature";

export default new Feature({
  id: 'storage-quota',
  name: 'Storage Quotas',
  description: [
    `There were several attempts made, mostly by Google Chrome, to allow Web applications to query the system for the size of the storage space
         currently used and available for the application. The most recent one, <b>Quota Estimation API</b>, is also in development in Firefox as of June 2017.`,
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
      </dl>`,
  tests: [
    Feature.containedIn('navigator.storage', typeof(window) !== 'undefined' && (window.navigator || {}).storage, 'estimate'),
    Feature.navigatorContains('persistentStorage', false)
  ],
  demo: {
    html: `<p>Estimated storage usage is <b id="usage">unknown</b> bytes.</p>
<p>Estimated storage quota is <b id="quota">unknown</b> bytes.</p>
<p>Estimated usage is <b id="percent">unknown</b>%.</p>`,
    js: `if ('storage' in navigator && 'estimate' in navigator.storage) {
  navigator.storage.estimate()
    .then(estimate => {
      document.getElementById('usage').innerHTML = estimate.usage;
      document.getElementById('quota').innerHTML = estimate.quota;
      document.getElementById('percent').innerHTML = (estimate.usage * 100 / estimate.quota).toFixed(0);
    });
}`
  },
  links: [
    {url: 'https://storage.spec.whatwg.org/', title: 'Specification Draft'},
    {url: 'http://www.html5rocks.com/en/tutorials/offline/quota-research/', title: 'Quota limitations analysis'}
  ]
})
