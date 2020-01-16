import {Feature} from "../../utils/feature";

export default new Feature({
  id: 'wake-lock',
  name: 'Wake Lock',
  description: [`The <b>Wake Lock API</b> allows Web applications to prevent the resource such as the screen or system from becoming
        unavailable as long as the application holds a lock for that resource. The purpose of the API is to let the user or the application to complete
        the ongoing long activity - like navigation or reading - uninterrupted.`,
    `The initial implementation attempt that was experimentally available in some browsers was just a boolean flag controllable by the application. It was considered too open for abuse and too implicit.`,
    `More explicit approach is proposed as of mid-2019 and is available behind an "Experimental Web Platform Features" flag as well as via <a href="https://developers.chrome.com/origintrials/#/view_trial/902971725287784449" target="_blank" rel="noopener">Origin Trial</a> in Google Chrome. 
        It allows to specify the resource on which the lock is requested, although currently only <code>screen</code> option is available. The API also allows subscribing to the event when an external factor has interrupted the lock.`
    ],
  api: `<p><b>Newer specification</b></p>
      <dl>
        <dt><code>wakeLock = navigator.wakeLock.request('screen')</code></dt>
        <dd>Requests a wake lock on the resource specified, such as <code>screen</code> or <code>system</code>. 
        Returns a <code>Promise</code> with the lock managing object.</dd>
        <dt><code>wakeLock.addEventListener('release', listener)</code></dt>
        <dd>An event fired when the lock has been released, possibly by external factor such as when user switched to another tab.</dd>
        <dt><code>wakeLock.release()</code></dt>
        <dd>Manually releases the existing lock.</dd>
      </dl>
      <p><b>Older specification</b></p>
      <dl>
        <dt><code>screen.keepAwake = true</code></dt>
        <dd>The property allowing to acquire a screen wake lock when set to <code>true</code> and release it when set to <code>false</code>.</dd>
      </dl>`,
  demo: {
    html: `<p>Wake Lock status: <b id="status">unknown</b>.</p>
<p>Supported API: <b id="api">none</b>.</p>
<p><button onclick="toggle()">Toggle</button></p>`,
    js: `function printStatus(status) {
  document.getElementById("status").innerHTML = status;
}

let wakeLockObj = null;

function toggle() {
  if ("keepAwake" in screen) {
    screen.keepAwake = !screen.keepAwake;
    printStatus(screen.keepAwake ? 'acquired' : 'not acquired');
  } else if ("wakeLock" in navigator) {
    if (wakeLockObj) {
      wakeLockObj.release();
      wakeLockObj = null;
      printStatus('released');
    } else {
      printStatus('acquiring...');
      navigator.wakeLock.request('screen')
        .then((wakeLock) => {
          wakeLockObj = wakeLock;
          
          wakeLockObj.addEventListener('release', () => {
            printStatus('released externally');
            wakeLockObj = null;
          })
          
          printStatus('acquired');
        })
        .catch((err) => {
          console.error(err);
          printStatus('failed to acquire: ' + err.message);
        })
    }
  }
}

if ("keepAwake" in screen) {
  document.getElementById("api").innerHTML = 'screen.keepAwake';
  printStatus('not acquired');
} else if ("wakeLock" in navigator) {
  document.getElementById("api").innerHTML = 'navigator.wakeLock';
  printStatus('not acquired');
}`
  },
  tests: [
    Feature.containedIn('screen', typeof(window) !== 'undefined' && window.screen, 'keepAwake'),
    Feature.navigatorContains('wakeLock')
  ],
  links: [
    {url: 'https://w3c.github.io/wake-lock/', title: 'W3C Specification Draft'},
    {url: 'https://web.dev/wakelock/', title: 'Stay awake with the Wake Lock API'},
  ]
})
