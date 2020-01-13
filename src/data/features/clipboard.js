import {Feature} from "../../utils/feature";

export default new Feature({
  id: 'clipboard',
  name: 'Clipboard (Copy & Paste)',
  description: [`The <b>Clipboard API</b> gives Web applications a way to react on cut, copy and paste operations performed by the user as well as
        read from or write to the system clipboard directly on behalf of user.`,
    `There are two flavors of Clipboard API available - the older, synchronous, and the newer, asynchronous. The newer API is only available
        on HTTPS and require explicit <a href="/permissions.html">user permission</a>.`],
  api: `<p><b>Older, synchronous API</b></p>
      <dl>
        <dt><code>document.addEventListener('cut/copy/paste', listener)</code></dt>
        <dd>An event fired when the user invoked the particular clipboard operation (either cut, copy or paste).</dd>
        <dt><code>event.clipboardData.setData('text/plain', data)</code></dt>
        <dd>Sets the data that is to be written to the clipboard by the cut or copy operations in the specified format.</dd>
        <dt><code>event.clipboardData.getData('text/plain')</code></dt>
        <dd>Returns the data that has been read from the clipboard by the paste operation in the specified format.</dd>
        <dt><code>document.execCommand('cut/copy/paste')</code></dt>
        <dd>Programatically invokes the specified clipboard operation (either cut, copy or paste) on the data or element currently having a focus.</dd>
      </dl>
      <p><b>Newer, asynchronous API</b></p>
      <dl>
        <dt><code>navigator.clipboard.writeText(text)</code></dt>
        <dd>Writes the data to the clipboard. Returns a <code>Promise</code> resolved when the operation has succeeded.</dd>
        <dt><code>navigator.clipboard.readText()</code></dt>
        <dd>Returns a <code>Promise</code> resolved with the data read from the clipboard.</dd>
      </dl>`,
  caniuse: 'clipboard',
  tests: [
    Feature.windowContains('ClipboardEvent'),
    Feature.documentContains('oncut'),
    Feature.documentContains('oncopy'),
    Feature.documentContains('onpaste'),
    Feature.navigatorContains('clipboard')
  ],
  demo: {
    html: `<p class="heading">Use the forms below for programmatic clipboard access or invoke standard copy/cut/paste operations with your keyboard.</p>
<section>
  <label><input type="radio" name="api" value="sync"> Use older, synchronous API</label><br/>
  <label><input type="radio" name="api" value="async" checked> Use newer, asynchronous API</label>
</section>
<section>
  <h2>Cut/Paste Example</h2>
  <p>
    <textarea class="js-cuttextarea">Hello! Cut me programatically or maybe try pasting here.</textarea>
  </p>

  <p>
    <button class="js-textareacutbtn">Cut text programatically</button>
  </p>
</section>

<section>
  <h2>Copy Example</h2>
  <p>Email me at <a class="js-emaillink" href="mailto:matt@example.co.uk">matt@example.co.uk</a></p>
  <p>
    <button class="js-emailcopybtn">Copy Email Address programatically</button>
  </p>
</section>

<p id="logTarget"></p>

<p><small>Demo based on <a href="https://googlechrome.github.io/samples/cut-and-copy/index.html" target="_blank">Google Chrome examples</a>.</small></p>`,
    js: `var logTarget = document.getElementById('logTarget');

function useAsyncApi() {
  return document.querySelector('input[value=async]').checked;
}

function log(event) {
  var timeBadge = new Date().toTimeString().split(' ')[0];
  var newInfo = document.createElement('p');
  newInfo.innerHTML = '<span class="badge">' + timeBadge + '</span> ' + event + '</b>.';
  logTarget.appendChild(newInfo);
}

function performCopyEmail() {
  var selection = window.getSelection();
  var emailLink = document.querySelector('.js-emaillink');

  if (useAsyncApi()) {
    navigator.clipboard.writeText(emailLink.textContent)
      .then(() => log('Async writeText successful, "' + emailLink.textContent + '" written'))
      .catch(err => log('Async writeText failed with error: "' + err + '"'));
  } else {
    selection.removeAllRanges();
    var range = document.createRange();
    range.selectNode(emailLink);
    selection.addRange(range);
  
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      log('Copy email command was ' + msg);
    } catch (err) {
      log('execCommand Error', err);
    }
    
    selection.removeAllRanges();
  }
}

function performCutTextarea() {
  var cutTextarea = document.querySelector('.js-cuttextarea');

  if (useAsyncApi()) {
    navigator.clipboard.writeText(cutTextarea.textContent)
      .then(() => {
        log('Async writeText successful, "' + cutTextarea.textContent + '" written');
        cutTextarea.textContent = '';
      })
      .catch(err => log('Async writeText failed with error: "' + err + '"'));
  } else {
    var hasSelection = document.queryCommandEnabled('cut');
    cutTextarea.select();
  
    try {
      var successful = document.execCommand('cut');
      var msg = successful ? 'successful' : 'unsuccessful';
      log('Cutting text command was ' + msg);
    } catch (err) {
      log('execCommand Error', err);
    }
  }
}

// Get the buttons
var cutTextareaBtn = document.querySelector('.js-textareacutbtn');
var copyEmailBtn = document.querySelector('.js-emailcopybtn');

// Add click event listeners
copyEmailBtn.addEventListener('click', performCopyEmail);
cutTextareaBtn.addEventListener('click', performCutTextarea);

function logUserOperation(event) {
  log('User performed <b>' + event.type + '</b> operation. Payload is: <b>' + event.clipboardData.getData('text/plain') + '</b>');
}

document.addEventListener('cut', logUserOperation);
document.addEventListener('copy', logUserOperation);
document.addEventListener('paste', logUserOperation);`,
    jsOnExit: `document.removeEventListener('cut', logUserOperation);
document.removeEventListener('copy', logUserOperation);
document.removeEventListener('paste', logUserOperation);`
  },
  links: [
    {url: 'https://w3c.github.io/clipboard-apis/', title: 'Specification Draft'},
    {url: 'https://developer.mozilla.org/en-US/docs/Web/API/ClipboardEvent', title: 'MDN: ClipboardEvent'},
    {
      url: 'https://www.lucidchart.com/techblog/2014/12/02/definitive-guide-copying-pasting-javascript/',
      title: 'The Definitive Guide to Copying and Pasting in JavaScript'
    },
    {url: 'https://developers.google.com/web/updates/2018/03/clipboardapi', title: 'Unblocking Clipboard Access'}
  ]
})
