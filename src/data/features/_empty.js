import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'TODO',
  name: 'TODO',
  description: [
    `TODO`,
  ],
  api: `<p><b>Heading</b></p>
    <dl>
      <dt><code>code</code></dt>
      <dd>Text <code>code</code>.</dd>
    </dl>`,
  demo: {
    html: ``,
    js: ``,
    jsOnExit: ``,
    css: ``,
    cssHidden: ``,
  },
  caniuse: 'TODO',
  tests: [
    Feature.windowContains('TODO'),
  ],
  links: [
    {url: 'TODO', title: 'TODO'},
  ]
})
