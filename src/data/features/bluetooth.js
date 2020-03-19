import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'bluetooth',
  name: 'Bluetooth',
  description: [
    `The <b>Web Bluetooth API</b> is a low-level API allowing Web applications to pair with the nearby Bluetooth Low Energy-enabled peripheral devices and access their services exposed.`
  ],
  api: `<dl>
        <dt><code>navigator.bluetooth.requestDevice(serviceFilters)</code></dt>
        <dd>Scans for the device in range supporting the requested services. Returns a <code>Promise</code>.</dd>
        <dt><code>device.gatt.connect()</code></dt>
        <dd>Returns a <code>Promise</code> resolved with the server object providing access to the services available on the device.</dd>
        <dt><code>server.getPrimaryService(name)</code></dt>
        <dd>Returns a <code>Promise</code> resolved with the particular Bluetooth service on the device.</dd>
        <dt><code>service.getCharacteristic(name)</code></dt>
        <dd>Returns a <code>Promise</code> resolved with the GATT characteristic object.</dd>
        <dt><code>characteristic.readValue()</code></dt>
        <dd>Returns a <code>Promise</code> resolved with a raw value from the GATT characteristic.</dd>
        <dt><code>characteristic.writeValue(value)</code></dt>
        <dd>Writes a new value for the GATT characteristic.</dd>
      </dl>`,
  tests: [Feature.navigatorContains('bluetooth')],
  caniuse: 'web-bluetooth',
  demo: {
    html: `<p>
  <button onclick="readBatteryLevel()">Read Bluetooth device's<br>battery level</button>
</p>

<p id="target"></p>

<p><small>Based on code snippets from <a href="https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web" target="_blank" rel="noopener">Google Developers</a>.</small></p>`,
    js: `function readBatteryLevel() {
  var $target = document.getElementById('target');
  
  if (!('bluetooth' in navigator)) {
    $target.innerText = 'Bluetooth API not supported.';
    return;
  }
  
  navigator.bluetooth.requestDevice({
      filters: [{
        services: ['battery_service']
      }]
    })
    .then(function (device) {
      return device.gatt.connect();
    })
    .then(function (server) {
      return server.getPrimaryService('battery_service');
    })
    .then(function (service) {
      return service.getCharacteristic('battery_level');
    })
    .then(function (characteristic) {
      return characteristic.readValue();
    })
    .then(function (value) {
      $target.innerHTML = 'Battery percentage is <b>' + value.getUint8(0) + '</b>.';
    })
    .catch(function (error) {
      $target.innerText = error;
    });
}`
  },
  links: [
    {url: 'https://webbluetoothcg.github.io/web-bluetooth/', title: 'Specification Draft'},
    {
      url: 'https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web',
      title: 'Interact with BLE devices on the Web'
    }
  ]
})
