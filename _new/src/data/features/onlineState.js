import {Feature} from "../../utils/feature";

export default new Feature({
  id: 'online-state',
  name: 'Online State',
  description: `Browsers expose a network connection availability information to the Web application, so that the applications may react properly, i.e.
        stop all the operations utilising the network and switch to cached data when offline condition was detected.`,
  api: `<dl>
        <dt><code>navigator.onLine</code></dt>
        <dd>Returns <code>true</code> when the browser detects network connection available, <code>false</code> otherwise.</dd>
        <dt><code>window.addEventListener('online', listener)</code></dt>
        <dd>An event fired when the browser detects network connection has become available.</dd>
        <dt><code>window.addEventListener('offline', listener)</code></dt>
        <dd>An event fired when the browser detects network connection has become unavailable.</dd>
      </dl>`,
  caniuse: 'online-status',
  tests: [Feature.navigatorContains('onLine')],
  demo: {
    html: `<p>Turn the network connection on/off to see the changes.</p>

<p>Initial connection state was <b id="status">unknown</b>.</p>

<div id="target"></div>`,
    js: `document.getElementById('status').innerHTML = navigator.onLine ? 'online' : 'offline';

var target = document.getElementById('target');

function handleStateChange() {
  var timeBadge = new Date().toTimeString().split(' ')[0];
  var newState = document.createElement('p');
  var state = navigator.onLine ? 'online' : 'offline';
  newState.innerHTML = '<span class="badge">' + timeBadge + '</span> Connection state changed to <b>' + state + '</b>.';
  target.appendChild(newState);
}

window.addEventListener('online', handleStateChange);
window.addEventListener('offline', handleStateChange);`,
    jsOnExit: `window.removeEventListener('online', handleStateChange);
window.removeEventListener('offline', handleStateChange);`
  },
  links: [
    {url: 'https://html.spec.whatwg.org/multipage/browsers.html#browser-state', title: 'Specification'},
    {
      url: 'https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine#Specification',
      title: 'MDN description'
    }
  ]
})
