import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'freeze-resume',
  name: 'Freeze/Resume Detection',
  description: [
    `The <b>Page Lifecycle API</b> is an addition to the previously existing page state change events, including <a href="/foreground-detection.html">foreground detection</a> & focus info.
    It allows Web applications to register for browser-generated events when the inactive application's tab is going to be frozen for CPU & battery usage optimization as well as when it is resumed on subsequent activation.`,
    `The API also provides a <code>wasDiscarded</code> flag that enables detecting the scenario when the frozen tab has been discarded (removed from memory) and requires a new page load when being restored.
    The flag would be set to <code>true</code> for this kind of page loads.`,
    `As of Spring 2020, the API is only implemented in Chromium-based browsers.`,
  ],
  api: `<dl>
      <dt><code>document.addEventListener('freeze')</code></dt>
      <dd>An event fired when the page has been frozen and unloaded by the operating system.</dd>
      <dt><code>document.addEventListener('resume')</code></dt>
      <dd>An event fired when the page has been resumed after being frozen by the operating system.</dd>
      <dt><code>document.wasDiscarded</code></dt>
      <dd>A boolean flag indicating whether the current load has happened after the web application has been previously discarded.</dd>
    </dl>`,
  demo: {
    html: `<p>Was current page load initiated from a discarded state? <b id="wasDiscarded">unknown</b>.</p>
<p>Change the browser tab state to observe the changes log.</p>
<div id="target"></div>
<p><small>Based on the demo from <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api" target="_blank" rel="noopener">Google Developers</a>.</small></p>`,
    js: `var target = document.getElementById('target');

if ('wasDiscarded' in document) {
  document.getElementById('wasDiscarded').innerText = document.wasDiscarded.toString();
}

function getState() {
  if (document.visibilityState === 'hidden') {
    return 'hidden';
  }
  if (document.hasFocus()) {
    return 'focused';
  }
  return 'not focused';
};

var state = getState();

function logStateChange(nextState) {
  var prevState = state;
  if (nextState !== prevState) {
    var timeBadge = new Date().toTimeString().split(' ')[0];
    var newLog = document.createElement('p');
    newLog.innerHTML = '<span class="badge">' + timeBadge + '</span> State changed from <b>' + prevState + '</b> to <b>' + nextState + '</b>.';
    target.appendChild(newLog);
    state = nextState;
  }
};

function onPageStateChange() {
  logStateChange(getState())
}

['pageshow', 'focus', 'blur', 'visibilitychange', 'resume'].forEach(function (type) {
  window.addEventListener(type, onPageStateChange, {capture: true});
});

function onFreeze() {
  logStateChange('frozen');
}

window.addEventListener('freeze', onFreeze, {capture: true});

function onPageHide(event) {
  if (event.persisted) {
    // If the event's persisted property is \`true\` the page is about
    // to enter the page navigation cache, which is also in the frozen state.
    logStateChange('frozen');
  } else {
    // If the event's persisted property is not \`true\` the page is about to be unloaded.
    logStateChange('terminated');
  }
}

window.addEventListener('pagehide', onPageHide, {capture: true});
`,
    jsOnExit: `['pageshow', 'focus', 'blur', 'visibilitychange', 'resume'].forEach(function (type) {
  window.removeEventListener(type, onPageStateChange, {capture: true});
});

window.removeEventListener('freeze', onFreeze, {capture: true});
window.removeEventListener('pagehide', onPageHide, {capture: true});`
  },
  tests: [
    Feature.documentContains('onfreeze'),
    Feature.documentContains('onresume'),
  ],
  links: [
    {url: 'https://wicg.github.io/page-lifecycle/', title: 'Specification Draft'},
    {url: 'https://developers.google.com/web/updates/2018/07/page-lifecycle-api', title: 'Google Developers: Page Lifecycle API'},
  ]
})
