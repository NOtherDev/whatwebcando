import {Feature} from "../../utils/feature";

export default new Feature({
  id: 'device-position',
  aliases: ['device-orientation'],
  name: 'Device Position',
  description: [`The first-generation device position support is a part of <b>Device Orientation API</b>. It allows Web applications to access the gyroscope and compass data in order to determine the static orientation
        of the user's device in all the three dimensions, expressed in degrees of divergence from the "natural" northbound lie flat position.`,
    `The newer specification based on the <strong>Generic Sensor API</strong> also exists - the Orientation Sensor APIs (in absolute and relative variants). 
          Contrary to the previous specification it provides readings expressed as <a href="https://en.wikipedia.org/wiki/Quaternions_and_spatial_rotation" target="_blank" rel="noopener">quaternions</a> what makes it directly compatible with drawing environments like WebGL.`,
    `For the detection of the device's movements, see <a href="/device-motion.html">Device Motion</a>.`],
  api: `<p><b>As a part of Device Orientation API</b></p>
      <dl>
        <dt><code>window.addEventListener('deviceorientation', listener)</code></dt>
        <dd>An event fired when the significant changes in the device's orientation has occured.</dd>
        <dt><code>event.alpha</code></dt>
        <dd>Returns device's current heading (direction) in degrees, counted counterclockwise from the North (0) through West (90), South (180) and East (270).</dd>
        <dt><code>event.beta</code></dt>
        <dd>Returns device's current front/back tilt in degrees, 0 when lying horizontally upward facing, 90 when in vertical position,
          -90 in vertical upside down, -180 when horizontal upside down.</dd>
        <dt><code>event.gamma</code></dt>
        <dd>Returns device's current left/right tilt in degrees, from -90 when turned left to 90 when turned right.</dd>
      </dl>
      <p><b>Absolute Orientation Sensor API</b></p>
      <dl>
        <dt><code>sensor = new AbsoluteOrientationSensor()</code></dt>
        <dd>Creates an object serving as an accessor to the orientation readings in relation to the Earth’s reference coordinate system, based on accelerometer, gyroscope and magenetometer readings.</dd>
        <dt><code>sensor.addEventListener('reading', listener)</code></dt>
        <dd>An event fired when the orientation reading has changed, indicating that the sensor object contains updated quaternion representing the device's orientation.</dd>
        <dt><code>sensor.start()</code></dt>
        <dd>Starts listening for the sensor readings.</dd>
        <dt><code>sensor.quaternion</code></dt>
        <dd>Returns the last available reading expressed as quaternion representing the device's orientation.</dd>
      </dl>
      <p><b>Relative Orientation Sensor API</b></p>
      <dl>
        <dt><code>sensor = new RelativeOrientationSensor()</code></dt>
        <dd>Creates an object serving as an accessor to the orientation readings in relation to a stationary reference coordinate system, based on accelerometer and gyroscope readings.</dd>
        <dt><code>sensor.addEventListener('reading', listener)</code></dt>
        <dd>An event fired when the orientation reading has changed, indicating that the sensor object contains updated quaternion representing the device's orientation.</dd>
        <dt><code>sensor.start()</code></dt>
        <dd>Starts listening for the sensor readings.</dd>
        <dt><code>sensor.quaternion</code></dt>
        <dd>Returns the last available reading expressed as quaternion representing the device's orientation.</dd>
      </dl>`,
  caniuse: 'deviceorientation',
  demo: {
    html: `<table>
  <tr>
    <td>Tilt Left/Right [gamma]</td>
    <td id="doTiltLR"></td>
  </tr>
  <tr>
    <td>Tilt Front/Back [beta]</td>
    <td id="doTiltFB"></td>
  </tr>
  <tr>
    <td>Direction [alpha]</td>
    <td id="doDirection"></td>
  </tr>
</table>

<div id="logoContainer">
  <img src="https://www.w3.org/html/logo/downloads/HTML5_Badge_512.png" id="imgLogo">
</div>

<p><small>Demo from <a href="https://www.html5rocks.com/en/tutorials/device/orientation/" target="_blank" rel="noopener">HTML5 Rocks</a> article.</small></p>`,
    css: `.container {
  perspective: 300;
  -webkit-perspective: 300;
}

#imgLogo {
  width: 275px;
  margin-left: auto;
  margin-right: auto;
  display: block;
  padding: 15px;
}`,
    js: `if ('DeviceOrientationEvent' in window) {
  window.addEventListener('deviceorientation', deviceOrientationHandler, false);
} else {
  document.getElementById('logoContainer').innerText = 'Device Orientation API not supported.';
}

function deviceOrientationHandler (eventData) {
  var tiltLR = eventData.gamma;
  var tiltFB = eventData.beta;
  var dir = eventData.alpha;
  
  document.getElementById("doTiltLR").innerHTML = Math.round(tiltLR);
  document.getElementById("doTiltFB").innerHTML = Math.round(tiltFB);
  document.getElementById("doDirection").innerHTML = Math.round(dir);

  var logo = document.getElementById("imgLogo");
  logo.style.webkitTransform = "rotate(" + tiltLR + "deg) rotate3d(1,0,0, " + (tiltFB * -1) + "deg)";
  logo.style.MozTransform = "rotate(" + tiltLR + "deg)";
  logo.style.transform = "rotate(" + tiltLR + "deg) rotate3d(1,0,0, " + (tiltFB * -1) + "deg)";
}`,
    jsOnExit: `window.removeEventListener('deviceorientation', deviceOrientationHandler);`
  },
  tests: [
    Feature.windowContains('DeviceOrientationEvent'),
    Feature.windowContains('AbsoluteOrientationSensor'),
    Feature.windowContains('RelativeOrientationSensor')
  ],
  links: [
    {
      url: 'https://w3c.github.io/deviceorientation/spec-source-orientation.html',
      title: 'Older Device Orientation API Specification Draft'
    },
    {url: 'https://www.w3.org/TR/orientation-sensor/', title: 'Orientation Sensors specification draft'},
    {url: 'https://www.w3.org/TR/motion-sensors/', title: 'Motion Sensors Explainer'},
    {
      url: 'https://developers.google.com/web/updates/2017/09/sensors-for-the-web',
      title: 'Google Developers: Sensors For The Web'
    },
    {url: 'https://github.com/kenchris/sensor-polyfills', title: 'Polyfills for the W3C Generic Sensor APIs'}
  ]
})
