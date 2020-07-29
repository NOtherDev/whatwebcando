import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'nfc',
  name: 'NFC',
  description: [
    `The <b>Web NFC API</b> is a low-level API that provides sites the ability to read and write to nearby NFC (Near-Field Communication) devices.`,
    `It allows starting up a scan that informs when an NFC tag matching some <code>options</code> has been tapped. It also provides a method to write a message via NFC.`,
    `Current support is limited to an experimental implementation in Chrome, available behind the "enable-webnfc" flag on Android. There was also Firefox OS experimental implementation that is <code>moz</code>-prefixed and doesn't follow the current state of the specification draft.`
  ],
  api: `<dl>
        <dt><code>const reader = new NDEFReader()</code></dt>
        <dd>Creates an object used for NDEF readings.</dd>
        <dt><code>reader.scan(options)</code></dt>
        <dd>Returns a <code>Promise</code> resolved if starting NFC scan was successful.</dd>
        <dt><code>reader.addEventListener('reading', listener)</code></dt>
        <dd>An event fired when a new reading is available.</dd>
        <dt><code>reader.addEventListener('error', listener)</code></dt>
        <dd>An event fired when an error happened during reading.</dd>
        <dt><code>const writer = new NDEFWriter()</code></dt>
        <dd>Creates an object used for NDEF writings.</dd>
        <dt><code>writer.write(message, options)</code></dt>
        <dd>Returns a <code>Promise</code> resolved if writing the <code>message</code> (String, ArrayBuffer or NDEF record) with <code>options</code> was successful.</dd>
      </dl>`,
  tests: [
    Feature.windowContains('NDEFReader'),
    Feature.windowContains('NDEFWriter')
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
    const reader = new NDEFReader();
    try {
      await reader.scan();
      reader.onreading = event => {
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
  if ("NDEFWriter" in window) {
    const writer = new NDEFWriter();
    try {
      await writer.write("What Web Can Do Today");
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
