import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'serial',
  name: 'Serial Port',
  description: [
    `The <b>Web Serial API</b> allows Web applications to interact with the devices connected to the system via Serial Port.
      In order to authorize the application to get the access to the device, user needs to confirm the intent in the browser's UI that in turn may only be 
      initiated with a gesture (for example, a button click, but not automatically by arbitrary JavaScript). The API exposes the connectivity via a pair of
       <a href="https://developer.mozilla.org/en-US/docs/Web/API/Streams_API" target="_blank" rel="noopener"><code>Stream</code>s</a> – one for reading and one for writing into the serial port.`,
    `The specification, as of Spring 2020, is in design phase and early experimental implementations in Google Chrome only. 
      Using it requires participation in <a href="https://developers.chrome.com/origintrials/#/view_trial/2992641952387694593" target="_blank" rel="noopener">Origin Trial</a> program.`
  ],
  api: `<dl>
      <dt><code>const port = await navigator.serial.requestPort()</code></dt>
      <dd>Returns the <code>Promise</code> resolved with the port object representing the connection after user's consent.</dd>
      <dt><code>port.open(options)</code></dt>
      <dd>Returns the <code>Promise</code> resolved when the system establishes a connection through the serial port.</dd>
      <dt><code>port.getInfo()</code></dt>
      <dd>Returns a set of metadata about the connected device, including its serial number, name and manufacturer data.</dd>
      <dt><code>port.readable</code></dt>
      <dd>Returns a <a href="https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream" target="_blank" rel="noopener"><code>ReadableStream</code></a> representing the data incoming via the serial port.</dd>
      <dt><code>port.writable</code></dt>
      <dd>Returns a <a href="https://developer.mozilla.org/en-US/docs/Web/API/WritableStream" target="_blank" rel="noopener"><code>WritableStream</code></a> representing the data being sent from the system via the serial port.</dd>
    </dl>`,
  tests: [Feature.navigatorContains('serial')],
  demo: {
    html: `<button id="connectButton">Connect via Serial Port</button>

<div id="target"></div>

<p><small>Demo from <a href="https://codelabs.developers.google.com/codelabs/web-serial/" target="_blank" rel="noopener">Google Developers</a> codelabs.</small></p>`,
    js: `document.getElementById('connectButton').addEventListener('click', () => {
  if (navigator.serial) {
    connectSerial();
  } else {
    alert('Web Serial API not supported.');
  }
});

async function connectSerial() {
  const log = document.getElementById('target');
    
  try {
    const port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    
    const decoder = new TextDecoderStream();
    
    port.readable.pipeTo(decoder.writable);

    const inputStream = decoder.readable;
    const reader = inputStream.getReader();
    
    while (true) {
      const { value, done } = await reader.read();
      if (value) {
        log.textContent += value + '\\n';
      }
      if (done) {
        console.log('[readLoop] DONE', done);
        reader.releaseLock();
        break;
      }
    }
  
  } catch (error) {
    log.innerHTML = error;
  }
}`
  },
  links: [
    {url: 'https://wicg.github.io/serial/', title: 'Specification Draft'},
    {
      url: 'https://codelabs.developers.google.com/codelabs/web-serial/',
      title: 'Getting started with the Web Serial API – codelabs'
    }
  ]
})
