import {Feature} from "../../utils/feature";

export default new Feature({
  id: 'nfc',
  name: 'NFC',
  description: [
    `The <b>Web NFC API</b> is a low-level API allowing Web applications to access and exchange the data with the Near-Field Communication devices, such as NFC tags.`,
    `It allows setting up a watch that informs when the NFC tag matching the <code>options</code> has appeared in the device sensor proximity. It also provides a method to push a message via NFC interface.`,
    `Current support is limited to an experimental implementation in Chrome, available behind an "Experimental Web Platform Features" on Android. There was also Firefox OS experimental implementation that is <code>moz</code>-prefixed and doesn't follow the current state of the specification draft.`
  ],
  api: `<dl>
        <dt><code>navigator.nfc.watch(callback, options)</code></dt>
        <dd>Registers for a notification about the data read from the NFC adapter specified by <code>options</code>.</dd>
        <dt><code>navigator.nfc.push(message, options)</code></dt>
        <dd>Triggers sending the <code>message</code> (string, <code>ArrayBuffer</code> or NDEF record structure) to the NFC adapter specified by <code>options</code>.</dd>
      </dl>`,
  tests: [Feature.navigatorContains('nfc')],
  demo: {
    html: `<p>
  <button onclick="readWriteNfc()">Test NFC Read/Write</button>
</p>

<pre id="log"></pre>

<p><small>Based on the code snippets from <a href="https://w3c.github.io/web-nfc/#examples">specification draft</a>.</small></p>`,
    js: `function readWriteNfc() {
  if ('nfc' in navigator) {
    navigator.nfc.watch(function (message) {
        consoleLog("NFC message received from URL " + message.url);
        if (message.data[0].recordType === 'empty') {
          navigator.nfc.push([{
            url: message.url,
            data: [{
              recordType: "text",
              data: 'Hello World'
            }]
          }]);
        }
        processMessage(message);
      }, {mode: 'any'})
      .then(() => consoleLog("Added a watch."))
      .catch(err => consoleLog("Adding watch failed: " + err.name));
  } else {
    consoleLog('NFC API not supported.');
  }
}

function consoleLog(data) {
  var logElement = document.getElementById('log');
  logElement.innerHTML += '\\n' + data;
}

function processMessage(message) {
  message.data.forEach(function (record) {
    if (record.recordType == "string") {
      consoleLog('Data is string: ' + record.data);
    } else if (record.recordType == "json") {
      processJSON(record.data);
    } else if (record.recordType == "url") {
      consoleLog("Data is URL: " + record.data);
    } else if (record.recordType == "opaque" && record.mediaType == 'image/png') {
      processPng(record.data);
    };
  });
}

function processPng(data) {
  consoleLog("Known image/png data");

  var img = document.createElement("img");
  img.src = URL.createObjectURL(new Blob(data, 'image/png'));
  img.onload = function () {
    window.URL.revokeObjectURL(this.src);
  };
};

function processJSON(data) {
  var obj = JSON.parse(data);
  consoleLog("JSON data: " + obj.myProperty.toString());
};`
  },
  links: [
    {url: 'https://w3c.github.io/web-nfc/', title: 'Specification Draft'},
    {
      url: 'https://developer.mozilla.org/en-US/docs/Web/API/NFC_API/Using_the_NFC_API',
      title: 'MDN: Using the NFC API (covers outdated spec revision)'
    }
  ]
})
