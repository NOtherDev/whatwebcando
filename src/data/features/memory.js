import {Feature} from "../../utils/feature";

export default new Feature({
  id: 'memory',
  name: 'Device Memory',
  description: [`The <b>Device Memory API</b> allows Web applications to assess the class of the device by the size of the RAM memory installed.
        It might be used to identify the lower-end devices to provide the reduced, lightweight experience of the website for performance reasons.
        The value provided by the API does not hint how much of the memory is actually available for the application to use - its purpose is only
        to serve as a device class indication.`,
    `The API consists of two parts. The first is the memory size exposed via the JavaScript property. The second is the <a href="http://httpwg.org/http-extensions/client-hints.html" target="_blank" rel="noopener">Client Hint</a> mechanism of the browser
        that sends the total device memory information as <code>Device-Memory</code> HTTP request header when the server previously opted-in
        to receiving this information with <code>Accept-CH: Device Memory</code> HTTP response header, so that the server side might decide to serve 
        the content optimized for the particular class of device.`],
  api: `<dl>
        <dt><code>navigator.deviceMemory</code></dt>
        <dd>Returns the approximate total RAM memory size of the device, in GiB.</dd>
      </dl>`,
  tests: [Feature.navigatorContains('deviceMemory')],
  demo: {
    html: `Your device memory is ~<b id="result">unknown</b> GiB.`,
    js: `document.getElementById('result').innerHTML = navigator.deviceMemory || 'unknown'`
  },
  // caniuse: 'mdn-api_navigator_devicememory',
  links: [
    {url: 'https://w3c.github.io/device-memory/', title: 'Specification Draft'}
  ]
})
