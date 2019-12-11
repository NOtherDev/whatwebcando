import {Feature} from "../../utils/feature";

export default new Feature({
  id: 'permissions',
  name: 'Permissions',
  description: `The <b>Permissions API</b> provides the uniform way for Web applications to query for the permission status for the features
        that might require user consent, like notifications or geolocation. With Permissions API the app can list the permissions
        granted by the user without actually triggering the feature itself.`,
  api: `<dl>
        <dt><code>navigator.permissions.query({name: feature})</code></dt>
        <dd>Returns a <code>Promise</code> resolved with the object representing the permission status of the requested feature.</dd>
        <dt><code>permissionStatus.state</code></dt>
        <dd>Returns the permission status of the requested feature, either <code>granted</code>, <code>denied</code> or - in case the user was not yet asked - <code>prompt</code>.</dd>
        <dt><code>permissionStatus.addEventListener('change', listener)</code></dt>
        <dd>An event fired when the permission status of the requested feature has changed.</dd>
      </dl>`,
  caniuse: 'permissions-api',
  tests: [Feature.navigatorContains('permissions')],
  demo: {
    html: `<div>
  <p>
    <b><a href="/geolocation.html">Geolocation</a></b> permission status is <b id="geolocation-status">unknown</b>.
    
    <button onclick="requestGeolocation()">Request</button>
  </p>
  <p>
    <b><a href="/local-notifications.html">Notifications</a></b> permission status is <b id="notifications-status">unknown</b>.
    
    <button onclick="requestNotifications()">Request</button>
  </p>
  <p>
    <b><a href="/push-notifications.html">Push</a></b> permission status is <b id="push-status">unknown</b>.
    
    <button onclick="requestPush()">Request</button>
  </p>
  <p>
    <b>Midi</b> permission status is <b id="midi-status">unknown</b>.
    
    <button onclick="requestMidi()">Request</button>
  </p>
  <p>
    <b><a href="/camera-microphone.html">Camera</a></b> permission status is <b id="camera-status">unknown</b>.
    
    <button onclick="requestCamera()">Request</button>
  </p>
  <p>
    <b><a href="/camera-microphone.html">Microphone</a></b> permission status is <b id="microphone-status">unknown</b>.
    
    <button onclick="requestMicrophone()">Request</button>
  </p>
  <p>
    <b><a href="/background-sync.html">Background Sync</a></b> permission status is <b id="background-sync-status">unknown</b>.
  </p>
  <p>
    <b><a href="/ambient-light.html">Ambient Light Sensor</a></b> permission status is <b id="ambient-light-sensor-status">unknown</b>.
  </p>
  <p>
    <b><a href="/device-motion.html">Accelerometer</a></b> permission status is <b id="accelerometer-status">unknown</b>.
  </p>
  <p>
    <b><a href="/device-motion.html">Gyroscope</a></b> permission status is <b id="gyroscope-status">unknown</b>.
  </p>
  <p>
    <b><a href="/device-motion.html">Magnetometer</a></b> permission status is <b id="magnetometer-status">unknown</b>.
  </p>
</div>

<p id="logTarget"></p>`,
    js: `if ('permissions' in navigator) {
  var logTarget = document.getElementById('logTarget');

  function handleChange(permissionName, newState) {
    var timeBadge = new Date().toTimeString().split(' ')[0];
    var newStateInfo = document.createElement('p');
    newStateInfo.innerHTML = '<span class="badge">' + timeBadge + '</span> State of <b>' + permissionName + '</b> permission status changed to <b>' + newState + '</b>.';
    logTarget.appendChild(newStateInfo);
  }

  function checkPermission(permissionName, descriptor) {
    try {
    navigator.permissions.query(Object.assign({name: permissionName}, descriptor))
      .then(function (permission) {
        document.getElementById(permissionName + '-status').innerHTML = permission.state;
        permission.addEventListener('change', function (e) {
          document.getElementById(permissionName + '-status').innerHTML = permission.state;
          handleChange(permissionName, permission.state);
        });
      });
    } catch (e) {
    }
  }

  checkPermission('geolocation');
  checkPermission('notifications');
  checkPermission('push', {userVisibleOnly: true});
  checkPermission('midi', {sysex: true});
  checkPermission('camera');
  checkPermission('microphone');
  checkPermission('background-sync');
  checkPermission('ambient-light-sensor');
  checkPermission('accelerometer');
  checkPermission('gyroscope');
  checkPermission('magnetometer');

  var noop = function () {};
  navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
  
  function requestGeolocation() {
    navigator.geolocation.getCurrentPosition(noop);
  }

  function requestNotifications() {
    Notification.requestPermission();
  }

  function requestPush() {
    navigator.serviceWorker.getRegistration()
      .then(function (serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.subscribe();
      });
  }

  function requestMidi() {
    navigator.requestMIDIAccess({sysex: true});
  }
  
  function requestCamera() {
    navigator.getUserMedia({video: true}, noop, noop)
  }
  
  function requestMicrophone() {
    navigator.getUserMedia({audio: true}, noop, noop)
  }
}`,
    cssHidden: `.demo-placeholder {
  overflow: hidden;
}

#logTarget, .demo-placeholder div {
  float: left;
  width: 50%;
}`
  },
  links: [
    {url: 'https://w3c.github.io/permissions/', title: 'Specification Draft'},
    {
      url: 'https://developers.google.com/web/updates/2015/04/permissions-api-for-the-web',
      title: 'Permissions API for the Web'
    },
    {url: 'https://permission.site', title: 'Permissions Demo'}
  ]
})
