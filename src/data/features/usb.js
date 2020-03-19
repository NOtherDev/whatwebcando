import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'usb',
  name: 'USB',
  description: [`The <b>WebUSB API</b> allows Web applications to interact with the Universal Serial Bus-compatible devices available in the system.
      In order to authorize the application to get the access to the device, user needs to confirm the intent in the browser's UI that in turn may only be 
      initiated with a gesture (for example, a button click, but not automatically by arbitrary JavaScript).`,
    `The API is based on the <a href="http://www.usb.org/developers/docs/" target="_blank" rel="noopener">USB 3.1 specification</a> and exposes all the USB primitives to JavaScript
       - including configurations, interfaces, endpoints and all the transfer types: CONTROL (suitable for commands), INTERRUPT (suitable for small time-sensitive data), 
       BULK (suitable for large time-sensitive data) and ISOCHRONOUS (suitable for streams, for example media)`,
    `The specification, apart from the JavaScript API, defines a Platform Descriptor object that might be implemented at the device side to advertize its
      support for WebUSB. Google Chrome's implementation uses it to notify the user about the landing page of the plugged in device with the system notification.`],
  api: `<p><b>Connecting to the device</b></p>
      <dl>
        <dt><code>navigator.usb.requestDevice(filters)</code></dt>
        <dd>Returns the <code>Promise</code> resolved with the device object that matches the specified filter by <a href="http://www.linux-usb.org/usb.ids" target="_blank" rel="noopener">predefined</a>
         vendor ID, product ID, class or subclass code, protocol code or serial number.</dd>
        <dt><code>navigator.usb.getDevices()</code></dt>
        <dd>Returns the <code>Promise</code> resolved with the device objects for the devices previously authorized for this application.</dd>
        <dt><code>navigator.usb.addEventListener('connect', listener)</code></dt>
        <dd>An event fired when the already authorized device has been connected to the system, containing the connected device object.</dd>
        <dt><code>navigator.usb.addEventListener('disconnect', listener)</code></dt>
        <dd>An event fired when the previously connected device has been disconnected from the system, containing the disconnected device object.</dd>
      </dl>
      <p><b>Session setup</b></p>
      <dl>
        <dt><code>device.open()</code></dt>
        <dd>Opens the communication session with the device. Returns a <code>Promise</code> resolved when the session has been opened.</dd>
        <dt><code>device.close()</code></dt>
        <dd>Closes the communication session with the device. Returns a <code>Promise</code> resolved when the session has been closed.</dd>
        <dt><code>device.configurations</code></dt>
        <dd>Contains the device-provided configuration objects with <code>configurationValue</code> identifier and the list of available <code>interfaces</code>.</dd>
        <dt><code>device.selectConfiguration(configurationValue)</code></dt>
        <dd>Selects the configuration of the device. Returns a <code>Promise</code> resolved when the setup has been applied.</dd>
        <dt><code>device.claimInterface(interfaceNumber)</code></dt>
        <dd>Claims the interface of the device (by the number specified in <code>configuration.interfaces</code>. Returns a <code>Promise</code> resolved when the setup has been applied.</dd>
      </dl>
      <p><b>Data transfers</b></p>
      <dl>
        <dt><code>device.controlTransferIn(setup, length)</code></dt>
        <dd>Waits for a specified control transfer from the device. Returns the <code>Promise</code> resolved with the transfer data and status.</dd>
        <dt><code>device.controlTransferOut(setup, data)</code></dt>
        <dd>Sends a specified control transfer to the device. Returns the <code>Promise</code> resolved with the transfer status and the number of bytes written.</dd>
        <dt><code>device.transferIn(endpointNumber, length)</code></dt>
        <dd>Waits for a bulk or interrupt transfer from the device on a specified endpoint. Returns the <code>Promise</code> resolved with the transfer data and status.</dd>
        <dt><code>device.transferOut(endpointNumber, data)</code></dt>
        <dd>Sends a bulk or interrupt transfer to the specified endpoint of the device. Returns the <code>Promise</code> resolved with the transfer status and the number of bytes written.</dd>
        <dt><code>device.isochronousTransferIn(endpointNumber, packetLengths)</code></dt>
        <dd>Waits for a specified isochronous transfer from the device. Returns the <code>Promise</code> resolved with the list of packets received, each containing data and status.</dd>
        <dt><code>device.isochronousTransferOut(endpointNumber, data, packetLengths)</code></dt>
        <dd>Sends a specified isochronous transfer to the device. Returns the <code>Promise</code> resolved with the list of packets sent, each containing status and the number of bytes written.</dd>
      </dl>`,
  tests: [Feature.navigatorContains('usb')],
  caniuse: 'webusb',
  demo: {
    html: `<button id="arduinoButton">Talk to Arduino</button>

<div id="target"></div>

<p><small>Demo from <a href="https://developers.google.com/web/updates/2016/03/access-usb-devices-on-the-web" target="_blank" rel="noopener">Google Developers</a> article.</small></p>`,
    js: `document.getElementById('arduinoButton').addEventListener('click', function () {
  if (navigator.usb) {
    talkToArduino();
  } else {
    alert('WebUSB not supported.');
  }
});

async function talkToArduino() {
  try {
    let device = await navigator.usb.requestDevice({ filters: [{ vendorId: 0x2341 }] });
    await device.open(); // Begin a session.
    await device.selectConfiguration(1); // Select configuration #1 for the device.
    await device.claimInterface(2); // Request exclusive control over interface #2.
    await device.controlTransferOut({
      requestType: 'class',
      recipient: 'interface',
      request: 0x22,
      value: 0x01,
      index: 0x02
    });
  
    // Ready to receive data
    let result = device.transferIn(5, 64); // Waiting for 64 bytes of data from endpoint #5.
    let decoder = new TextDecoder();
    document.getElementById('target').innerHTML = 'Received: ' + decoder.decode(result.data);
  } catch (error) {
    document.getElementById('target').innerHTML = error;
  }
}`
  },
  links: [
    {url: 'https://wicg.github.io/webusb/', title: 'Specification Draft'},
    {
      url: 'https://developers.google.com/web/updates/2016/03/access-usb-devices-on-the-web',
      title: 'Google Developers: Access USB Devices on the Web'
    }
  ]
})
