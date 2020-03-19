import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'foreground-detection',
  name: 'Foreground Detection',
  description: `The <b>Page Visibility API</b> is useful for the Web application to know whether it is currently displayed on the front or not,
        especially to stop resource-intensive UI animations or data refreshing when it is not needed. On the mobile devices,
        the primary reason for that is to reduce the battery usage.`,
  api: `<dl>
        <dt><code>document.hidden</code></dt>
        <dd>Returns <code>true</code> if the page is currently hidden.</dd>
        <dt><code>document.visibilityState</code></dt>
        <dd>Returns current visibility state: <code>visible</code>, <code>hidden</code>, <code>prerender</code> or <code>unloaded</code>.</dd>
        <dt><code>document.addEventListener('visibilitychange')</code></dt>
        <dd>An event fired when the visibility state of the page has changed.</dd>
      </dl>`,
  caniuse: 'pagevisibility',
  demo: {
    html: `<p>Switch the browser tab to see the changes.</p>
<p>Initial page visibility was <b id="status">unknown</b>.</p>
<div id="target"></div>
<p><small>Based on demo from <a href="https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API">MDN</a>.</small></p>`,
    js: `var target = document.getElementById('target');

var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") {
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.mozHidden !== "undefined") {
  hidden = "mozHidden";
  visibilityChange = "mozvisibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
} else {
  target.innerText = 'Page Visibility API not supported.';
}

function handleVisibilityChange() {
  var timeBadge = new Date().toTimeString().split(' ')[0];
  var newState = document.createElement('p');
  newState.innerHTML = '<span class="badge">' + timeBadge + '</span> Page visibility changed to <b>' + (document[hidden] ? 'hidden' : 'visible') + '</b>.';
  target.appendChild(newState);
}

document.addEventListener(visibilityChange, handleVisibilityChange, false);

if (hidden in document) {
  document.getElementById('status').innerHTML = document[hidden] ? 'hidden' : 'visible';
}`,
    jsOnExit: `document.removeEventListener(visibilityChange, handleVisibilityChange);`
  },
  tests: [Feature.documentContains('visibilityState')],
  links: [
    {url: 'https://w3c.github.io/page-visibility/', title: 'Specification Draft'},
    {url: 'https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API', title: 'MDN: Page Visibility API'},
    {
      url: 'http://www.sitepoint.com/introduction-to-page-visibility-api/',
      title: 'SitePoint: Introduction to Page Visibility API'
    }
  ]
})
