import {Feature} from "../../utils/feature";

export default new Feature({
  id: 'geofencing',
  name: 'Geofencing',
  description: [`The <b>Geofencing API</b> allow authorized Web applications to define geographic areas and receive notifications when the device enters or leaves these areas without the need to periodically query the <a href="/geolocation.html">Geolocation API</a>. Thanks to the Service Worker being employed that allows code execution outside of the lifecycle of the owning Web application, the notification may be also received while the app is not opened in the browser.`,
    `As of early 2020, no vendor implemented the API and the proposal seems to be abandoned.`],
  api: `<dl>
        <dt><code>region = new CircularGeofenceRegion({name, latitude, longitude, radius})</code></dt>
        <dd>Creates a circular region definition with the coordinates and radius specified.</code></dt>
        <dt><code>serviceWorkerRegistration.geofencing.add(region, options)</code></dt>
        <dd>Sets up a region to be watched for and subscribes to the notification when the device enters or leaves the region.</dd>
        <dt><code>self.addEventListener('geofenceenter', listener)</code></dt>
        <dd>An event fired when the device enters one of the defined regions, provided as <code>event.geofence.region</code>.</dd>
        <dt><code>self.addEventListener('geofenceleave', listener)</code></dt>
        <dd>An event fired when the device leaves one of the defined regions, provided as <code>event.geofence.region</code>.</dd>
      </dl>`,
  tests: [Feature.windowContains('GeofenceManager')],
  links: [
    {url: 'https://w3c.github.io/geofencing-api/', title: 'Specification Draft'},
    {
      url: 'https://bugs.chromium.org/p/chromium/issues/detail?id=383125',
      title: 'Chrome Issue tracking the implementation trial and later removal'
    }
  ]
})
