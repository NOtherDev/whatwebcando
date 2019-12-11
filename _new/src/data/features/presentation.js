import {Feature} from "../../utils/feature";

export default new Feature({
  id: 'presentation',
  name: 'Presentation Features',
  description: [`The <b>Presentation API</b> aims at allowing Web applications to use the presentation display mode. The display used to present
        may be the same that the browser is using, but may also be the external display device. The browser might serve as the initiator
        of the presentation as well as receive the connections to the presentations initiated externally on the presentation display.`,
    `The API at the moment is supported only in Chrome and Opera, on desktop and on Android.`],
  api: `<dl>
        <dt><code>navigator.presentation.defaultRequest = new PresentationRequest(presentationUrl)</code></dt>
        <dd>Sets up an object representing the browser's request for initiating the specified presentation on a presentation display.</dd>
        <dt><code>request.getAvailability()</code></dt>
        <dd>Returns a <code>Promise</code> resolved with the object providing availability of a presentation display.</dd>
        <dt><code>availability.value</code></dt>
        <dd>Returns a boolean indicating whether a presentation display is available.</dd>
        <dt><code>availability.addEventListener('change', listener)</code></dt>
        <dd>An event fired when the availability status of a presentation display has changed.</dd>
        <dt><code>request.start()</code></dt>
        <dd>Returns a <code>Promise</code> resolved with the connection to the newly initiated presentation on the presentation display.</dd>
        <dt><code>connection.state</code></dt>
        <dd>Returns a string indicating the state of the presentation on the presentation display, i.e. <code>connected</code>, <code>closed</code>, <code>terminated</code>.</dd>
        <dt><code>connection.addEventListener('statechange', listener)</code></dt>
        <dd>An event fired when the state of the presentation on the presentation display has changed.</dd>
        <dt><code>connection.send(message)</code></dt>
        <dd>Sends a message to the presentation running on the presentation display.</dd>
        <dt><code>connection.addEventListener('message', listener)</code></dt>
        <dd>An event fired when a message from the presentation running on the presentation display has been received.</dd>
        <dt><code>connection.close()</code></dt>
        <dd>Closes the connection to the presentation running on the presentation display, letting it continue uninterrupted.</dd>
        <dt><code>connection.terminate()</code></dt>
        <dd>Terminates the presentation running on the presentation display.</dd>
        <dt><code>navigator.presentation.receiver.getConnections()</code></dt>
        <dd>Returns a <code>Promise</code> resolved with the array of connections to the presentations running on a presentation display.</dd>
        <dt><code>navigator.presentation.receiver.addEventListener('connectionavailable', listener)</code></dt>
        <dd>An event fired when the new connection to the presentations running on a presentation display has become available.</dd>
      </dl>`,
  tests: [
    Feature.navigatorContains('presentation'),
    Feature.windowContains('PresentationRequest')
  ],
  links: [
    {url: 'https://w3c.github.io/presentation-api/', title: 'Specification Draft'},
    {url: 'https://www.w3.org/community/webscreens/presentation-api-demos/', title: 'Presentation API demos'},
    {
      url: 'https://developers.google.com/web/updates/2015/11/presentation-api?hl=en',
      title: 'Google Cast for Chrome on Android - using Presentation API underneath'
    }
  ]
})
