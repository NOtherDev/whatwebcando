import {Feature} from "../../utils/feature";

export default new Feature({
  id: 'vr',
  name: 'Virtual & Augmented Reality',
  description: [`The support for Virtual and Augmented Reality for the Web applications as of January 2018 is limited and mostly experimental.
        There are two APIs available. The first one - <b>WebVR API</b> - is available in some browsers for some particular VR environments.
        The newer one - <b>WebXR Device API</b> - which tries to approach the topic in a more generic fashion, including AR or Mixed Reality devices, is in the development.`,
    `Both APIs share the same fundamental concepts. Their scope is to allow authorized Web applications to discover available VR/AR devices, 
        establish a session with the device, read the device-specific geometry data required to prepare the proper rendering and bind a <code>&lt;canvas&gt;</code>
        element as a visual layer onto the device.`,
    `This way the rendering details are handled by the existing canvas interfaces like <a href="https://developer.mozilla.org/pl/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL" target="_blank" rel="noopener">WebGL context</a>
        and the implementators very often delegate the rendering itself to the specialized libraries like <a href="https://aframe.io/" target="_blank" rel="noopener">A-Frame</a>.`],
  api: `<p><b>Older WebVR API</b></p>
      <dl>
        <dt><code>navigator.getVRDisplays()</code></dt>
        <dd>Returns a <code>Promise</code> resolved with the list of available <code>vrDevice</code> objects when they have become available.</dd>
        <dt><code>vrDevice.capabilities</code></dt>
        <dd>Lists the capabilities of the current VR device, including <code>hasExternalDisplay</code> or <code>canPresent</code> boolean flags.</dd>
        <dt><code>vrDevice.requestPresent(layers)</code></dt>
        <dd>Requests putting the specified visual layers onto VR device's display and starts a session with the device.
          A layer might be represented by an object containing canvas rendering context that defines the rendering that will be presented (<code>{source: canvasContext}</code>).</dd>
        <dt><code>vrDevice.getFrameData(frameData)</code></dt>
        <dd>Fills the passed <code>frameData</code> object with the projection matrices needed to render a frame.</dd>
        <dt><code>vrDevice.requestAnimationFrame(callback)</code></dt>
        <dd>Registers a <code>callback</code> that will be executed within the next rendering frame on the VR device.</dd>
        <dt><code>vrDevice.submitFrame()</code></dt>
        <dd>Indicates that the layers canvases are ready to be rendered as a frame on the VR device.</dd>
        <dt><code>vrDevice.exitPresent()</code></dt>
        <dd>Requests finishing the current session. Returns a <code>Promise</code> resolved when the VR session is finished.</dd>
      </dl>
      <p><b>Newer WebXR Device API</b></p>
      <dl>
        <dt><code>navigator.xr.requestDevice()</code></dt>
        <dd>Returns a <code>Promise</code> resolved with the selected AR/VR <code>xrDevice</code> object when it has become available.</dd>
        <dt><code>xrDevice.supportsSession({ exclusive: true })</code></dt>
        <dd>Returns a <code>Promise</code> resolved if the current AR/VR device allows exclusive immersive sessions.</dd>
        <dt><code>xrDevice.requestSession({ exclusive: true, outputContext: canvasContext })</code></dt>
        <dd>Returns a <code>Promise</code> resolved with the exclusive device session object <code>xrSession</code> after it has been established.
          Can get <code>outputContext</code> canvas context object that defines the rendering that will be presented.</dd>
        <dt><code>xrSession.requestFrameOfReference('headModel')</code></dt>
        <dd>Returns a <code>Promise</code> resolved with the frame of reference that provides a coordinate system for a given display type.</dd>
        <dt><code>xrSession.requestAnimationFrame(callback)</code></dt>
        <dd>Registers a <code>callback</code> that will be executed within the next rendering frame within the AR/VR session.</dd>
        <dt><code>xrSession.end()</code></dt>
        <dd>Requests finishing the current session. Returns a <code>Promise</code> resolved when the AR/VR session is finished.</dd>
      </dl>`,
  caniuse: 'webvr',
  tests: [
    Feature.navigatorContains('getVRDisplays'),
    Feature.navigatorContains('xr'),
  ],
  demo: {
    html: `<p><button type="button" id="startVRButton">Check for VR device</button></p>
<ul id="result"></ul>
<p>
  <a href="https://webvr.info/samples/" target="_blank" rel="noopener">Browse demos by Google</a><br/>
  <a href="https://mozvr.com/mobile/" target="_blank" rel="noopener">Browse demos by Mozilla</a>
</p>`,
    js: `document.getElementById('startVRButton').addEventListener('click', function () {
  if (navigator.getVRDisplays) {
    checkForVR();
  } else {
    alert('WebVR API is not supported.');
  }
});
        
async function checkForVR() {
  try {
    const displays = await navigator.getVRDisplays()
   
    if (!displays.length) {
      throw 'VR supported, but no VR displays available';
    }
    
    const result = document.getElementById('result');
        
    displays.forEach(function (display) {
      let li = document.createElement('li');
      li.innerHTML = display.displayName + ' (' + display.displayId + ')';
      result.appendChild(li);
    })
    
  } catch (err) {
    alert(err);
  }
}`
  },
  links: [
    {url: 'https://immersive-web.github.io/webvr/spec/1.1/', title: 'WebVR API Specification'},
    {
      url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebVR_API/Using_the_WebVR_API',
      title: 'MDN: Using the WebVR API'
    },
    {url: 'https://immersive-web.github.io/webxr/', title: 'WebXR Device API Specification'},
    {url: 'https://github.com/immersive-web/webxr/blob/master/explainer.md', title: 'WebXR Device API Explained'}
  ]
})
