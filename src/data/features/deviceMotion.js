import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'device-motion',
  aliases: ['accelerometer'],
  name: 'Device Motion',
  description: [
    `The first-generation device motions support is a part of <b>Device Orientation API</b>. It allows Web applications to access the accelerometer data
        expressed as acceleration (in m/s<sup>2</sup>) and gyroscope data expressed as rotation angle change (in &deg;/s) for each of the three dimensions, provided as events.`,
    `Since mid-2018 the newer, separate specifications for each sensor type, based on the <b>Generic Sensor API</b> are being introduced. The APIs providing direct access to the readings
        of physical devices (<b>Accelerometer API</b>, <b>Gyroscope API</b> and <b>Magnetometer API</b>) as well as high-level fusion sensors made up by combining
         the readings of the physical sensors (<b>Linear Acceleration Sensor API</b> and <b>Gravity Sensor API</b>).`,
    `For the detection of the device's static position and orientation, see <a href="/device-position.html">Device Position</a>.`
  ],
  api: `<p><b>As a part of (older) Device Orientation API</b></p>
      <dl>
        <dt><code>window.addEventListener('devicemotion', listener)</code></dt>
        <dd>An event fired when the significant changes in the device's acceleration or rotation has occured.</dd>
        <dt><code>event.acceleration</code></dt>
        <dd>A part of the event's payload returning the data about the current device's acceleration excluding gravity for all three axes
         (<code>acceleration.x</code>, <code>acceleration.y</code>, <code>acceleration.z</code>).</dd>
        <dt><code>event.accelerationIncludingGravity</code></dt>
        <dd>A part of the event's payload returning the data about the current device's acceleration including gravity if the device is unable
          to provide the data without the gravity effect using <code>event.acceleration</code>.</dd>
        <dt><code>event.rotationRate</code></dt>
        <dd>A part of the event's payload returning the data about the current device's rotation rates for all three axes
         (<code>rotationRate.alpha</code>, <code>rotationRate.beta</code>, <code>rotationRate.gamma</code>).</dd>
        <dt><code>event.interval</code></dt>
        <dd>A part of the event's payload returning the interval (in ms) at which the data is obtained from the accelerometer.</dd>
      </dl>
      <p><b>Accelerometer API</b></p>
      <dl>
        <dt><code>sensor = new Accelerometer()</code></dt>
        <dd>Creates an object serving as a direct accessor to the accelerometer readings.</dd>
        <dt><code>sensor.addEventListener('reading', listener)</code></dt>
        <dd>An event fired when the accelerometer reading has changed, indicating that the sensor object contains updated acceleration in rad/s for all three axes (<code>sensor.x</code>, <code>sensor.y</code>, <code>sensor.z</code>).</dd>
        <dt><code>sensor.start()</code></dt>
        <dd>Starts listening for the sensor readings.</dd>
      </dl>
      <p><b>Gyroscope API</b></p>
      <dl>
        <dt><code>sensor = new Gyroscope()</code></dt>
        <dd>Creates an object serving as a direct accessor to the gyroscope readings.</dd>
        <dt><code>sensor.addEventListener('reading', listener)</code></dt>
        <dd>An event fired when the gyroscope reading has changed, indicating that the sensor object contains updated angular velocity in rad/s for all three axes (<code>sensor.x</code>, <code>sensor.y</code>, <code>sensor.z</code>).</dd>
        <dt><code>sensor.start()</code></dt>
        <dd>Starts listening for the sensor readings.</dd>
      </dl>
      <p><b>Magnetometer API</b></p>
      <dl>
        <dt><code>sensor = new Magnetometer()</code></dt>
        <dd>Creates an object serving as a direct accessor to the magnetometer readings.</dd>
        <dt><code>sensor.addEventListener('reading', listener)</code></dt>
        <dd>An event fired when the magnetometer reading has changed, indicating that the sensor object contains updated magnetic field for all three axes (<code>sensor.x</code>, <code>sensor.y</code>, <code>sensor.z</code>).</dd>
        <dt><code>sensor.start()</code></dt>
        <dd>Starts listening for the sensor readings.</dd>
      </dl>
      <p><b>Linear Acceleration Sensor API</b></p>
      <dl>
        <dt><code>sensor = new LinearAccelerationSensor()</code></dt>
        <dd>Creates an object serving as an accessor to the linear acceleration readings based on accelerometer and either gyroscope or magnetometer.</dd>
        <dt><code>sensor.addEventListener('reading', listener)</code></dt>
        <dd>An event fired when the accelerometer reading has changed, indicating that the sensor object contains updated acceleration values in m/s<sup>2</sup> for all three axes (<code>sensor.x</code>, <code>sensor.y</code>, <code>sensor.z</code>).</dd>
        <dt><code>sensor.start()</code></dt>
        <dd>Starts listening for the sensor readings.</dd>
      </dl>
      <p><b>Gravity Sensor API</b></p>
      <dl>
        <dt><code>sensor = new GravitySensor()</code></dt>
        <dd>Creates an object serving as an accessor to the gravity readings based on accelerometer and gyroscope.</dd>
        <dt><code>sensor.addEventListener('reading', listener)</code></dt>
        <dd>An event fired when the accelerometer reading has changed, indicating that the sensor object contains updated acceleration values in m/s<sup>2</sup> for all three axes (<code>sensor.x</code>, <code>sensor.y</code>, <code>sensor.z</code>).</dd>
        <dt><code>sensor.start()</code></dt>
        <dd>Starts listening for the sensor readings.</dd>
      </dl>`,
  caniuse: 'deviceorientation',
  tests: [
    Feature.windowContains('DeviceMotionEvent'),
    Feature.windowContains('Accelerometer'),
    Feature.windowContains('Gyroscope'),
    Feature.windowContains('Magnetometer'),
    Feature.windowContains('LinearAccelerationSensor'),
    Feature.windowContains('GravitySensor'),
  ],
  demo: {
    html: `<table>
  <tr>
    <td>API used</td>
    <td id="moApi"></td>
  </tr>
  <tr>
    <td>linear acceleration (excl. gravity)</td>
    <td id="moAccel"></td>
  </tr>
  <tr>
    <td>acceleration incl. gravity</td>
    <td id="moAccelGrav"></td>
  </tr>
  <tr>
    <td>rotation rate</td>
    <td id="moRotation"></td>
  </tr>
  <tr>
    <td>interval (ms)</td>
    <td id="moInterval"></td>
  </tr>
</table>

<p><small>Demo based on <a href="https://www.html5rocks.com/en/tutorials/device/orientation/" target="_blank" rel="noopener">HTML5 Rocks</a> article.</small></p>`,
    js: `if ('LinearAccelerationSensor' in window && 'Gyroscope' in window) {
  document.getElementById('moApi').innerHTML = 'Generic Sensor API';
  
  let lastReadingTimestamp;
  let accelerometer = new LinearAccelerationSensor();
  accelerometer.addEventListener('reading', e => {
    if (lastReadingTimestamp) {
      intervalHandler(Math.round(accelerometer.timestamp - lastReadingTimestamp));
    }
    lastReadingTimestamp = accelerometer.timestamp
    accelerationHandler(accelerometer, 'moAccel');
  });
  accelerometer.start();
  
  if ('GravitySensor' in window) {
    let gravity = new GravitySensor();
    gravity.addEventListener('reading', e => accelerationHandler(gravity, 'moAccelGrav'));
    gravity.start();
  }
  
  let gyroscope = new Gyroscope();
  gyroscope.addEventListener('reading', e => rotationHandler({
    alpha: gyroscope.x,
    beta: gyroscope.y,
    gamma: gyroscope.z
  }));
  gyroscope.start();
  
} else if ('DeviceMotionEvent' in window) {
  document.getElementById('moApi').innerHTML = 'Device Motion API';
  
  var onDeviceMotion = function (eventData) {
    accelerationHandler(eventData.acceleration, 'moAccel');
    accelerationHandler(eventData.accelerationIncludingGravity, 'moAccelGrav');
    rotationHandler(eventData.rotationRate);
    intervalHandler(eventData.interval);
  }
  
  window.addEventListener('devicemotion', onDeviceMotion, false);
} else {
  document.getElementById('moApi').innerHTML = 'No Accelerometer & Gyroscope API available';
}

function accelerationHandler(acceleration, targetId) {
  var info, xyz = "[X, Y, Z]";

  info = xyz.replace("X", acceleration.x && acceleration.x.toFixed(3));
  info = info.replace("Y", acceleration.y && acceleration.y.toFixed(3));
  info = info.replace("Z", acceleration.z && acceleration.z.toFixed(3));
  document.getElementById(targetId).innerHTML = info;
}

function rotationHandler(rotation) {
  var info, xyz = "[X, Y, Z]";

  info = xyz.replace("X", rotation.alpha && rotation.alpha.toFixed(3));
  info = info.replace("Y", rotation.beta && rotation.beta.toFixed(3));
  info = info.replace("Z", rotation.gamma && rotation.gamma.toFixed(3));
  document.getElementById("moRotation").innerHTML = info;
}

function intervalHandler(interval) {
  document.getElementById("moInterval").innerHTML = interval;
}`,
    jsOnExit: `if (onDeviceMotion) {
    window.removeEventListener('devicemotion', onDeviceMotion);
}`
  },
  links: [
    {
      url: 'https://w3c.github.io/deviceorientation/spec-source-orientation.html#devicemotion',
      title: 'Device Orientation API Specification Draft'
    },
    {url: 'https://w3c.github.io/accelerometer/', title: 'Accelerometer API Specification Draft'},
    {url: 'https://w3c.github.io/gyroscope/', title: 'Gyroscope API Specification Draft'},
    {url: 'https://w3c.github.io/sensors/', title: 'Generic Sensor API Specification Draft'},
    {url: 'https://www.w3.org/TR/motion-sensors/', title: 'Motion Sensors Explainer'},
    {
      url: 'https://developers.google.com/web/updates/2017/09/sensors-for-the-web',
      title: 'Google Developers: Sensors For The Web'
    },
    {url: 'https://github.com/kenchris/sensor-polyfills', title: 'Polyfills for the W3C Generic Sensor APIs'}
  ]
})
