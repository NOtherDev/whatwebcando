import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'eye-dropper',
  name: 'EyeDropper',
  description: [
    `The <b>EyeDropper API</b> allows users to catch sample colors from their screen with an eyedropper tool.`,
    `Unlike <code>&lt;input type="color"&gt;</code>  on Chromium-based Desktop browsers, this API offers a simple interface to pick the colour of the entire device screen with a standard API.`,
  ],
  api: `<dl>
      <dt><code>const eyeDropper = new EyeDropper()</code></dt>
      <dd>Instantiates an <code>EyeDropper</code> object to be used to pick a color.</dd>
      <dt><code>eyeDropper.open()</code></dt>
      <dd>Return a promise that resolves to an object that gives access to the selected color (in hexadecimal sRGB format) with the <code>sRGBHex</code> property.</dd>
      <dt><code>eyeDropper.open({ signal: abortController.signal })</code></dt>
      <dd>Passing an <code>AbortSignal</code>, the eyeDropper will be aborted when the AbortSignal's <code>abort()</code> method is called.</dd>
    </dl>`,
  demo: {
    html: `<div class="column">
  <p>Click on the image below to activate the dropper</p>
  <img id="eyeDropperIcon" src="/images/cat.jpg"/>
  <p>The hex color of the selected pixel is <b><span id="colorCode">???</span></b></p>
</div>`,
    js: `// Create an EyeDropper object
let eyeDropper = new EyeDropper();

// Enter eyedropper mode
let icon = document.getElementById("eyeDropperIcon")
let color = document.getElementById("colorCode")
// You may use the dropper only on the cat!
icon.addEventListener('click', e => {
    eyeDropper.open()
    .then(colorSelectionResult => {
        // returns hex color value (#RRGGBB) of the selected pixel
        color.innerText = colorSelectionResult.sRGBHex;
    })
    .catch(error => {
        // handle the user choosing to exit eyedropper mode without a selection
    });
});
    `,
    jsOnExit: ``
  },
  tests: [
    Feature.windowContains('EyeDropper'),
  ],
  links: [
    {url: 'https://github.com/WICG/eyedropper-api/blob/main/README.md', title: 'EyeDropper - Explainer'},
    {url: 'https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API', title: 'EyeDropper - MDN Documentation'},
    {url: 'https://web.dev/eyedropper/', title: 'EyeDropper - Web.dev Article'},
    {url: 'https://fugu-tracker.web.app/?version=0&search=eyedropper', title: 'EyeDropper - Fugu API Tracker'},
  ]
})
