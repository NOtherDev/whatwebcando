import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'vr',
  name: 'Virtual & Augmented Reality',
  description: [`The support for Virtual and Augmented Reality for the Web applications as of early 2020 is limited and inconsistent.
        There are two APIs available. The older one - <b>WebVR API</b> - is available in some browsers for some particular VR environments.
        The newer one - <b>WebXR Device API</b> - which tries to approach the topic in a more generic fashion, including AR or Mixed Reality devices, is being deployed in Chromium-based browsers starting late 2019.`,
    `Both APIs share the same fundamental concepts. Their scope is to allow authorized Web applications to discover available VR/AR devices, 
        establish a session with the device, read the device-specific geometry data required to prepare the proper rendering and bind a <code>&lt;canvas&gt;</code>
        element as a visual layer onto the device.`,
    `This way the rendering details are handled by the existing canvas interfaces like <a href="https://developer.mozilla.org/pl/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL" target="_blank" rel="noopener">WebGL context</a>
        and the implementors very often delegate the rendering itself to the specialized libraries like <a href="https://aframe.io/" target="_blank" rel="noopener">A-Frame</a>.`],
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
     
        <dt><code>navigator.xr.isSessionSupported(mode)</code></dt>
        <dd>Returns a <code>Promise</code> resolved with a flag whether the device allows sessions of requested <code>mode</code> – either <code>inline</code> (within HTML) or <code>immersive-vr</code>.</dd>
        <dt><code>navigator.xr.requestSession(mode, options)</code></dt>
        <dd>Returns a <code>Promise</code> resolved with the AR/VR device session object <code>xrSession</code> after it has been established in requested <code>mode</code>.</dd>
        <dt><code>xrSession.requestReferenceSpace(type)</code></dt>
        <dd>Returns a <code>Promise</code> resolved with the reference space that provides a coordinate system for the requested type.</dd>
        <dt><code>xrSession.updateRenderState(state)</code></dt>
        <dd>Updates the render state to be applied on the next rendering frame, potentially changing the base WebGL layer.</dd>
        <dt><code>xrSession.requestAnimationFrame(callback)</code></dt>
        <dd>Registers a <code>callback</code> that will be executed within the next rendering frame within the AR/VR session.</dd>
        <dt><code>xrSession.end()</code></dt>
        <dd>Requests finishing the current session. Returns a <code>Promise</code> resolved when the AR/VR session is finished.</dd>
      </dl>`,
  caniuse: 'webxr',
  tests: [
    Feature.navigatorContains('xr'),
    Feature.navigatorContains('getVRDisplays'),
  ],
  demo: {
    html: `<p><button type="button" id="startVRButton">Check for VR device</button></p>
<ul id="result"></ul>
<p>
  <a href="https://immersive-web.github.io/webxr-samples/" target="_blank" rel="noopener">Browse WebXR samples</a><br/>
  <a href="https://mixedreality.mozilla.org/mobile/" target="_blank" rel="noopener">Browse demos by Mozilla</a>
</p>`,
    js: `document.getElementById('startVRButton').addEventListener('click', function () {
  if (navigator.xr) {
    checkForXR();
  } else if (navigator.getVRDisplays) {
    checkForVR();
  } else {
    alert('WebXR/WebVR APIs are not supported.');
  }
});

async function checkForXR() {
    if (!await navigator.xr.isSessionSupported('immersive-vr')) {
        alert('No immersive VR device detected');
        return;
    }

    const session = await navigator.xr.requestSession('immersive-vr');
    
    if (!session.inputSources.length) {
      throw 'VR supported, but no VR input sources available';
    }
    
    const result = document.getElementById('result');
    result.innerHTML = session.inputSources.length + ' input sources detected';
}
        
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
    {url: 'https://immersive-web.github.io/webxr/', title: 'WebXR Device API Specification'},
    {url: 'https://github.com/immersive-web/webxr/blob/master/explainer.md', title: 'WebXR Device API Explained'},
    {
      url: 'https://developer.mozilla.org/pl/docs/Web/API/WebXR_Device_API',
      title: 'MDN: WebXR Device API'
    },
    {url: 'https://immersive-web.github.io/webvr/spec/1.1/', title: 'WebVR API Specification'},
    {
      url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebVR_API/Using_the_WebVR_API',
      title: 'MDN: Using the WebVR API'
    },
  ]
})
