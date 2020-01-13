import {Feature} from "../../utils/feature";

export default new Feature({
  id: 'vibration',
  name: 'Vibration',
  description: `The <b>Vibration API</b> allows Web applications to use the device's built-in vibration, if one is present.`,
  api: `<dl>
        <dt><code>navigator.vibrate(durationOrPattern)</code></dt>
        <dd>Vibrate the device once for the duration given or according to durations pattern given.</dd>
      </dl>`,
  caniuse: 'vibration',
  tests: [Feature.navigatorContains('vibrate')],
  demo: {
    html: `<button onclick="vibrateSimple()">Vibrate for 200 ms</button>
<button onclick="vibratePattern()">Vibrate with pattern</button>`,
    js: `function vibrateSimple() {
  navigator.vibrate(200);
}

function vibratePattern() {
  navigator.vibrate([100, 200, 200, 200, 500]);
}`
  },
  links: [
    {url: 'http://dev.w3.org/2009/dap/vibration/', title: 'Specification Draft'},
    {url: 'https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API', title: 'MDN: Vibration API'},
    {
      url: 'http://illyism.com/journal/vibrate-mobile-phone-web-vibration-api',
      title: 'Learn how to vibrate your mobile phone on the Web using the vibration API'
    }
  ]
})
