import {Feature} from "../../utils/feature";

export default new Feature({
  id: 'geolocation',
  name: 'Geolocation',
  description: [`The <b>Geolocation API</b> lets authorized Web applications to access the location data provided by the device -
        obtained using either GPS or from the network environment. Apart from the one-off location query, it gives a way for the app to be notified
        about the location changes.`,
    `See <a href="/permissions.html">Permissions</a> for a way to check whether the user has granted or denied the permission to obtain the location by the origin.`],
  api: `<dl>
        <dt><code>navigator.geolocation.getCurrentPosition(callback)</code></dt>
        <dd>Runs one-off query for location with coordinates, accuracy, altitude & speed, if available.</dd>
        <dt><code>navigator.geolocation.watchPosition(callback)</code></dt>
        <dd>Sets up observing for location changes, invoking callback for every change.</dd>
      </dl>`,
  caniuse: 'geolocation',
  demo: {
    html: `<button id="askButton">Ask for location</button>

<div id="target"></div>`,
    js: `var target = document.getElementById('target');
var watchId;

function appendLocation(location, verb) {
  verb = verb || 'updated';
  var newLocation = document.createElement('p');
  newLocation.innerHTML = 'Location ' + verb + ': <a href="https://maps.google.com/maps?&z=15&q=' + location.coords.latitude + '+' + location.coords.longitude + '&ll=' + location.coords.latitude + '+' + location.coords.longitude + '" target="_blank" rel="noopener">' + location.coords.latitude + ', ' + location.coords.longitude + '</a>';
  target.appendChild(newLocation);
}

if ('geolocation' in navigator) {
  document.getElementById('askButton').addEventListener('click', function () {
    navigator.geolocation.getCurrentPosition(function (location) {
      appendLocation(location, 'fetched');
    });
    watchId = navigator.geolocation.watchPosition(appendLocation);
  });
} else {
  target.innerText = 'Geolocation API not supported.';
}`,
    jsOnExit: `if (watchId) navigator.geolocation.clearWatch(watchId)`
  },
  tests: [Feature.navigatorContains('geolocation')],
  links: [
    {url: 'http://www.w3.org/TR/geolocation-API/', title: 'Specification'},
    {
      url: 'https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation',
      title: 'MDN: Using geolocation'
    }
  ]
})
