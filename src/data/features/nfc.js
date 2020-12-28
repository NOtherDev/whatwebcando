import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'nfc',
  name: 'NFC',
  description: [
    `The <b>Web NFC API</b> is a low-level API that provides sites the ability to read and write to nearby NFC (Near-Field Communication) devices.`,
    `It allows starting up a scan that informs when an NFC tag has been tapped. It also provides a method to write a message via NFC.`,
    `Current support is limited to an experimental implementation in Chrome, available behind the "experimental-web-platform-features" flag on Android. There was also Firefox OS experimental implementation that is <code>moz</code>-prefixed and doesn't follow the current state of the specification draft.`
  ],
  api: `<dl>
        <dt><code>const ndef = new NDEFReader()</code></dt>
        <dd>Creates an object used for interacting with NDEF formatted NFC tags.</dd>
        <dt><code>ndef.scan(options)</code></dt>
        <dd>Returns a <code>Promise</code> resolved if starting NFC scan was successful.</dd>
        <dt><code>ndef.addEventListener('reading', listener)</code></dt>
        <dd>An event fired when a new reading is available.</dd>
        <dt><code>ndef.addEventListener('readingerror', listener)</code></dt>
        <dd>An event fired when an error happened during reading.</dd>
        <dt><code>ndef.write(message, options)</code></dt>
        <dd>Returns a <code>Promise</code> resolved if writing the <code>message</code> (String, ArrayBuffer or NDEF record) with <code>options</code> was successful.</dd>
      </dl>`,
  tests: [
    Feature.windowContains('NDEFReader')
  ],
  demo: {
    html: `<p>
  <button onclick="readTag()">Test NFC Read</button>
  <button onclick="writeTag()">Test NFC Write</button>
</p>
<pre id="log"></pre>
<p><small>Based on the code snippets from <a href="https://w3c.github.io/web-nfc/#examples">specification draft</a>.</small></p>`,
    js: `async function readTag() {
  if ("NDEFReader" in window) {
    const ndef = new NDEFReader();
    try {
      await ndef.scan();
      ndef.onreading = event => {
        const decoder = new TextDecoder();
        for (const record of event.message.records) {
          consoleLog("Record type:  " + record.recordType);
          consoleLog("MIME type:    " + record.mediaType);
          consoleLog("=== data ===\\n" + decoder.decode(record.data));
        }
      }
    } catch(error) {
      consoleLog(error);
    }
  } else {
    consoleLog("Web NFC is not supported.");
  }
}

async function writeTag() {
  if ("NDEFReader" in window) {
    const ndef = new NDEFReader();
    try {
      await ndef.write("What Web Can Do Today");
      consoleLog("NDEF message written!");
    } catch(error) {
      consoleLog(error);
    }
  } else {
    consoleLog("Web NFC is not supported.");
  }
}

function consoleLog(data) {
  var logElement = document.getElementById('log');
  logElement.innerHTML += data + '\\n';
};`
  },
  caniuse: 'webnfc',
  links: [
    {url: 'https://w3c.github.io/web-nfc/', title: 'Specification Draft'},
    {url: 'https://developer.mozilla.org/en-US/docs/Web/API/NFC_API/Using_the_NFC_API', title: 'MDN: Using the NFC API (covers outdated spec revision)'}
  ]
})
