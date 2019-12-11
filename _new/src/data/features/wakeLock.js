import {Feature} from "../../utils/feature";

export default new Feature({
  id: 'wake-lock',
  name: 'Wake Lock',
  description: [`The <b>Wake Lock API</b> allows Web applications to prevent the resource such as the screen or system from becoming
        unavailable as long as the application holds a lock for that resource. The purpose of the API is to let the user or the application to complete
        the ongoing long activity - like navigation or reading - uninterrupted.`,
    `The only available implementation, available behind an "Experimental Web Platform Features" flag in Google Chrome on desktop, is just a boolean flag controllable by the application, 
        based on the previous version of the specification. It is now considered too open for abuse and is lacking user consent, so the recent specification draft
        (published June 2017) proposes more explicit approach. It is not implemented by any vendor, yet.`],
  api: `<p><b>Newer specification</b></p>
      <dl>
        <dt><code>navigator.getWakeLock('screen')</code></dt>
        <dd>Requests a wake lock managing object on the resource specified, such as <code>screen</code> or <code>system</code>. 
        Returns a <code>Promise</code> with the lock managing object.</dd>
        <dt><code>lockRequest = lock.createRequest()</code></dt>
        <dd>Activates the wake lock on the previously acquired managing object.</dd>
        <dt><code>lockRequest.cancel()</code></dt>
        <dd>Releases the existing lock.</dd>
      </dl>
      <p><b>Older specification</b></p>
      <dl>
        <dt><code>screen.keepAwake = true</code></dt>
        <dd>The property allowing to acquire a screen wake lock when set to <code>true</code> and release it when set to <code>false</code>.</dd>
      </dl>`,
  demo: {
    html: `<p>Wake Lock status is <b id="status">unknown (not supported)</b>.</p>
<p><button onclick="toggle()">Toggle</button></p>`,
    js: `function printStatus() {
  document.getElementById("status").innerHTML = screen.keepAwake
    ? "enabled"
    : "disabled";
}

function toggle() {
  if ("keepAwake" in screen) {
    screen.keepAwake = !screen.keepAwake;
    printStatus();
  }
}

if ("keepAwake" in screen) {
  printStatus();
}`
  },
  tests: [
    Feature.containedIn('screen', typeof(window) !== 'undefined' && window.screen, 'keepAwake'),
    Feature.navigatorContains('getWakeLock')
  ],
  links: [
    {url: 'https://w3c.github.io/wake-lock/', title: 'W3C Specification Draft'}
  ]
})
