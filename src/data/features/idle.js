import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'idle',
  name: 'User Idle Detection',
  description: [
    `The <b>User Idle API</b> allows the Web application to detect the state when the user isn't active, i.e. there is no user-driven events generated in the system or the screen is locked. 
     Contrary to the previous <a href="/foreground-detection.html">Foreground Detection</a> capabilities, this API does not rely on the current tab activity – it detects when the user has been away from the device without locking it or has become inactive, regardless of which tab has been active.`,
    `As of Spring 2020, the API is at the early stage proposal, available in Google Chrome only using "Experimental Web Platform Features" flag.`,
    `This proposal does not address the system idle state, i.e. the state when the CPU isn't busy and previously delayed expensive operations might be initiated. To detect system idle state, the well-supported <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback" target="_blank" rel="noopener">requestIdleCallback</a> API exists.`,
  ],
  api: `<dl>
      <dt><code>const idleDetector = new IdleDetector(options)</code></dt>
      <dd>Instantiates the <code>IdleDetector</code> object to be used to listen for events when the user goes idle.</dd>
      <dt><code>idleDetector.start()</code></dt>
      <dd>Starts observing for the user being idle.</dd>
      <dt><code>const state = idleDetector.state</code></dt>
      <dd>Exposes the current state: the <code>state.user</code> flag describing the user as either <code>active</code> or <code>idle</code>, 
          and <code>state.screen</code> flag describing the display as <code>locked</code> or <code>unlocked</code>.</dd>
      <dt><code>idleDetector.addEventListener('change', listener)</code></dt>
      <dd>Register the <code>listener</code> to be called when the user's idle status has changed.</dd>
    </dl>`,
  demo: {
    html: `<p><button onclick="startDetector()">Start idle detection</button></p>
<p>Stop your activity for 60 seconds and/or block the screen to record the idle state changes.</p>
<div id="target"></div>
<p><small>Based on the demo from the <a href="https://github.com/samuelgoto/idle-detection" target="_blank" rel="noopener">proposal</a>.</small></p>`,
    js: `var idleDetector;

function handleIdleChange() { 
  const timeBadge = new Date().toTimeString().split(' ')[0];
  const newState = document.createElement('p');
  const {user, screen} = idleDetector.state;
  newState.innerHTML = '<span class="badge">' + timeBadge + '</span> User idle status changed to <b>' + user + '</b>. Screen idle status changed to <b>' + screen + '</b>.';
  target.appendChild(newState);
}
    
function startDetector() {
  if (!window.IdleDetector) {
    alert("Idle Detection API is not available");
    return;
  }
  
  const target = document.getElementById('target');
  
  try {
    idleDetector = new IdleDetector({ threshold: 60 });
    idleDetector.addEventListener('change', handleIdleChange);
    idleDetector.start();
  } catch (e) {
    alert('Idle Detection error:' + e);
  }
}`,
    jsOnExit: `if (idleDetector) {
  idleDetector.removeEventListener('change', handleIdleChange);
  idleDetector.stop();
}`
  },
  tests: [
    Feature.windowContains('IdleDetector'),
  ],
  links: [
    {url: 'https://github.com/samuelgoto/idle-detection', title: 'User Idle Detection - API proposal'},
  ]
})
