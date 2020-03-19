import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'network-type-speed',
  name: 'Network Type & Speed',
  description: [`The <b>Network Information API</b> allows Web applications to read the current network type and the maximum downlink speed that are assumed
        based on the underlying connection technology used by the client. It also allows to subscribe for a notification when the network type has changed.`,
    `The newest addition (mid-2017), implemented by Chrome on Android as of September 2017, also provides an effective network type information that in turn
        is calculated using the actual network performance metrics collected by the browser, allowing the Web applications to adjust to the quality of the connection.`],
  api: `<dl>
        <dt><code>navigator.connection.type</code></dt>
        <dd>Returns the theoretical type of the current connection, based on the underlying connection technology, i.e. <code>cellular</code>, <code>wifi</code>, <code>none</code> etc.</dd>
        <dt><code>navigator.connection.effectiveType</code></dt>
        <dd>Returns the information about the quality of the current connection based on recently observed performance metrics, regardless of the underlying connection technology, i.e. <code>slow-2g</code>, <code>2g</code>, <code>3g</code>, <code>4g</code>.</dd>
        <dt><code>navigator.connection.downlinkMax</code></dt>
        <dd>Returns the theoretical maxinum downlink speed, in Mbps, for the underlying technology of the current connection.</dd>
        <dt><code>navigator.connection.addEventListener('change', listener)</code></dt>
        <dd>An event fired when the connection type has changed.</dd>
      </dl>`,
  tests: [Feature.navigatorContains('connection')],
  caniuse: 'netinfo',
  demo: {
    html: `<p>Current theoretical network type is <b id="networkType">not available</b>.</p>
<p>Current effective network type is <b id="effectiveNetworkType">not available</b>.</p>
<p>Current max downlink speed is <b id="downlinkMax">not available</b>.`,
    js: `function getConnection() {
  return navigator.connection || navigator.mozConnection ||
    navigator.webkitConnection || navigator.msConnection;
}

function updateNetworkInfo(info) {
  document.getElementById('networkType').innerHTML = info.type;
  document.getElementById('effectiveNetworkType').innerHTML = info.effectiveType;
  document.getElementById('downlinkMax').innerHTML = info.downlinkMax;
}

var info = getConnection();
if (info) {
  info.onchange = function (event) {
    updateNetworkInfo(event.target);
  }
  updateNetworkInfo(info);
}`,
    jsOnExit: `if (info) info.onchange = null;`
  },
  links: [
    {url: 'https://wicg.github.io/netinfo/', title: 'Specification Draft'},
    {
      url: 'https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API',
      title: 'MDN: Network Information API'
    },
    {url: 'https://mxb.at/blog/connection-aware-components/', title: 'Connection-Aware Components'}
  ]
})
