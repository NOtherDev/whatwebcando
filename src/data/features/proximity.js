import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'proximity',
  name: 'Proximity Sensors',
  description: [`The <b>Proximity Events API</b> allows Web applications to get the access to the data from the device's proximity sensors, detecting whether there is a physical object near the device.`,
    `The first approach to supporting proximity sensor on the Web - as a standalone API - was implemented in Firefox. Since then the specification was rewritten to make use of the new <b>Generic Sensors API</b>, but no vendor implemented that spec as of early 2020.`],
  api: `<p><b>The old, standalone API</b></p>
      <dl>
        <dt><code>window.addEventListener('deviceproximity', listener)</code></dt>
        <dd>An event fired when the device has sensed the physical object proximity, containing approximate distance information.</dd>
        <dt><code>window.addEventListener('userproximity', listener)</code></dt>
        <dd>An event fired when the device has roughly sensed the physical object proximity, containing boolean <code>near</code> flag only.</dd>
      </dl>
      <p><b>The new, generic API</b></p>
      <dl>
        <dt><code>sensor = new ProximitySensor()</code></dt>
        <dd>Creates an object serving as an accessor to the proximity sensor readings.</dd>
        <dt><code>sensor.addEventListener('reading', listener)</code></dt>
        <dd>An event fired when the physical object proximity reading has changed, indicating that the sensor object contains updated approximate distance information in cm (<code>sensor.distance</code>) and boolean <code>sensor.near</code> flag.</dd>
        <dt><code>sensor.start()</code></dt>
        <dd>Starts listening for the sensor readings.</dd>
      </dl>`,
  caniuse: 'proximity',
  tests: [
    Feature.windowContains('ondeviceproximity'),
    Feature.windowContains('onuserproximity'),
    Feature.windowContains('ProximitySensor')
  ],
  demo: {
    html: `<p>Current approximate distance to object is <b id="deviceValue">unknown</b>.</p>
<p>Currently, the object is <b id="nearValue">in unknown proximity</b>.</p>

<div id="box"></div>`,
    cssHidden: `#box {
  width: 100px;
  height: 100px;
  border: 1px solid #000;
  margin-left: 10px;
  background-color: gray;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}`,
    js: `var box = document.getElementById('box');

function onDeviceProximityChanged(event) {
  document.getElementById('deviceValue').innerHTML = event.value + ' cm (' + event.min + '-' + event.max + ' cm range)';
  
  var size = Math.min(200, Math.max(20, 500 / (event.value || 1)));
  
  box.style.width = size + 'px';
  box.style.height = size + 'px';
}

function onUserProximityChanged(event) {
  document.getElementById('nearValue').innerHTML = event.near ? 'near' : 'rather far';
  box.style.backgroundColor = event.near ? 'red' : 'green';
}

window.addEventListener('deviceproximity', onDeviceProximityChanged);
window.addEventListener('userproximity', onUserProximityChanged);`,
    jsOnExit: `window.removeEventListener('deviceproximity', onDeviceProximityChanged);
window.removeEventListener('userproximity', onUserProximityChanged);`
  },
  links: [
    {url: 'https://w3c.github.io/proximity/', title: 'Proximity API Specification Draft'},
    {url: 'https://w3c.github.io/sensors/', title: 'Generic Sensor API Specification Draft'},
    {url: 'http://www.sitepoint.com/introducing-proximity-api/', title: 'SitePoint: Introducing the Proximity API'},
    {url: 'https://developer.mozilla.org/en-US/docs/Web/API/Proximity_Events', title: 'MDN: Proximity Events'}
  ]
})
