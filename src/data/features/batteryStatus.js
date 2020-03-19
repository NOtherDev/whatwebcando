import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'battery-status',
  name: 'Battery Status',
  description: `The <b>Battery Status API</b> allows Web applications to get the information about the device's power source, battery charge level,
        expected time of charging or discharging. It also exposes events whenever any of the information available changes. The API allows the applications
        to turn on/off its energy inefficient operations according to the power levels.`,
  api: `<dl>
        <dt><code>navigator.getBattery()</code></dt>
        <dd>Returns a <code>Promise</code> resolved with the object containing battery information.</dd>
        <dt><code>battery.charging</code></dt>
        <dd>Returns <code>true</code> if the device is currently being charged.</dd>
        <dt><code>battery.chargingTime</code></dt>
        <dd>Returns the number of seconds remaining until the battery is fully charged.</dd>
        <dt><code>battery.dischargingTime</code></dt>
        <dd>Returns the number of seconds remaining until the battery is fully discharged.</dd>
        <dt><code>battery.level</code></dt>
        <dd>Returns the battery charging level as the number in 0 to 1 range.</dd>
        <dt><code>battery.addEventListener('chargingchange', listener)</code></dt>
        <dd>An event fired when <code>battery.charging</code> value has changed.</dd>
        <dt><code>battery.addEventListener('chargingtimechange', listener)</code></dt>
        <dd>An event fired when <code>battery.chargingTime</code> value has changed.</dd>
        <dt><code>battery.addEventListener('dischargingtimechange', listener)</code></dt>
        <dd>An event fired when <code>battery.dischargingTime</code> value has changed.</dd>
        <dt><code>battery.addEventListener('levelchange', listener)</code></dt>
        <dd>An event fired when <code>battery.level</code> value has changed.</dd>
      </dl>`,
  caniuse: 'battery-status',
  tests: [
    Feature.navigatorContains('getBattery'),
    Feature.navigatorContains('battery')
  ],
  demo: {
    html: `<p>Initial battery status was <b id="charging">unknown</b>, charging time <b id="chargingTime">unknown</b>, discharging time <b id="dischargingTime">unknown</b>, level <b id="level">unknown</b>.</p>

<div id="target"></div>`,
    js: `if ('getBattery' in navigator || ('battery' in navigator && 'Promise' in window)) {
  var target = document.getElementById('target');

  function handleChange(change) {
    var timeBadge = new Date().toTimeString().split(' ')[0];
    var newState = document.createElement('p');
    newState.innerHTML = '<span class="badge">' + timeBadge + '</span> ' + change + '.';
    target.appendChild(newState);
  }
  
  function onChargingChange() {
    handleChange('Battery charging changed to <b>' + (this.charging ? 'charging' : 'discharging') + '</b>')
  }
  function onChargingTimeChange() {
    handleChange('Battery charging time changed to <b>' + this.chargingTime + ' s</b>');
  }
  function onDischargingTimeChange() {
    handleChange('Battery discharging time changed to <b>' + this.dischargingTime + ' s</b>');
  }
  function onLevelChange() {
    handleChange('Battery level changed to <b>' + this.level + '</b>');
  }

  var batteryPromise;
  
  if ('getBattery' in navigator) {
    batteryPromise = navigator.getBattery();
  } else {
    batteryPromise = Promise.resolve(navigator.battery);
  }
  
  batteryPromise.then(function (battery) {
    document.getElementById('charging').innerHTML = battery.charging ? 'charging' : 'discharging';
    document.getElementById('chargingTime').innerHTML = battery.chargingTime + ' s';
    document.getElementById('dischargingTime').innerHTML = battery.dischargingTime + ' s';
    document.getElementById('level').innerHTML = battery.level;
    
    battery.addEventListener('chargingchange', onChargingChange);
    battery.addEventListener('chargingtimechange', onChargingTimeChange);
    battery.addEventListener('dischargingtimechange', onDischargingTimeChange);
    battery.addEventListener('levelchange', onLevelChange);
  });
}`,
    jsOnExit: `if ('getBattery' in navigator || ('battery' in navigator && 'Promise' in window)) {
  var batteryPromise;
  
  if ('getBattery' in navigator) {
    batteryPromise = navigator.getBattery();
  } else {
    batteryPromise = Promise.resolve(navigator.battery);
  }
  
  batteryPromise.then(function (battery) {
    battery.removeEventListener('chargingchange', onChargingChange);
    battery.removeEventListener('chargingtimechange', onChargingTimeChange);
    battery.removeEventListener('dischargingtimechange', onDischargingTimeChange);
    battery.removeEventListener('levelchange', onLevelChange);
  });
}`
  },
  links: [
    {url: 'https://w3c.github.io/battery/', title: 'Specification Draft'},
    {url: 'https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API', title: 'MDN: Battery Status API'}
  ]
})
