import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'ambient-light',
  name: 'Ambient Light',
  description: [`The <b>Ambient Light API</b> allows Web applications to access the light intensity level measured by the device's light sensor, normally built-in with the device's camera.`,
    `The first approach to supporting light intensity sensor on the Web - as a standalone API - was implemented in Firefox back in 2013. Since then the specification was rewritten to make use of the new <b>Generic Sensors API</b>. This flavor, as of early 2020, is only experimentally implemented in Google Chrome, behind the "Generic Sensor Extra Classes" flag.`],
  api: `<p><b>The old, standalone API</b></p>
      <dl>
        <dt><code>window.addEventListener('devicelight', listener)</code></dt>
        <dd>An event fired when the device's light sensor measured value has changed, containing the light intensity expressed in lux.</dd>
      </dl>
      <p><b>The new, generic API</b></p>
      <dl>
        <dt><code>sensor = new AmbientLightSensor()</code></dt>
        <dd>Creates an object serving as an accessor to the light intensity sensor readings.</dd>
        <dt><code>sensor.addEventListener('reading', listener)</code></dt>
        <dd>An event fired when the light intensity reading has changed, indicating that the sensor object contains updated light intensity expressed in lux, in <code>sensor.illuminance</code> property.</dd>
        <dt><code>sensor.start()</code></dt>
        <dd>Starts listening for the sensor readings.</dd>
      </dl>`,
  caniuse: 'ambient-light',
  tests: [
    Feature.windowContains('ondevicelight'),
    Feature.windowContains('AmbientLightSensor')
  ],
  demo: {
    html: `<p>Current light intensity is <b id="value">unknown</b>.</p>

<div id="box"></div>`,
    cssHidden: `#box {
  width: 100px;
  height: 100px;
  border: 1px solid #000;
  margin-left: 10px;
}`,
    js: `function update(illuminance) {
  document.getElementById("value").innerHTML = illuminance + " lux";

  var colorPart = Math.min(255, illuminance).toFixed(0);
  document.getElementById("box").style.backgroundColor =
    "rgb(" + colorPart + ", " + colorPart + ", " + colorPart + ")";
}

if ("AmbientLightSensor" in window) {
  try {
    var sensor = new AmbientLightSensor();
    sensor.addEventListener("reading", function (event) {
      update(sensor.illuminance);
    });
    sensor.start();
  } catch (e) {
    console.error(e);
  }
}
if ("ondevicelight" in window) {
  function onUpdateDeviceLight(event) {
    update(event.value);
  }
  
  window.addEventListener("devicelight", onUpdateDeviceLight);
}`,
    jsOnExit: `if (onUpdateDeviceLight) window.removeEventListener('devicelight', onUpdateDeviceLight);`
  },
  links: [
    {url: 'https://w3c.github.io/ambient-light/', title: 'Ambient Light API Specification Draft'},
    {url: 'https://w3c.github.io/sensors/', title: 'Generic Sensor API Specification Draft'},
    {url: 'https://deanhume.com/ambient-light-sensor/', title: 'Getting started with the Ambient Light Sensor'}
  ]
})
