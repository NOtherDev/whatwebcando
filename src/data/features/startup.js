import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'startup',
  name: 'Run On Startup',
  description: [
    `The ability to launch the application on system startup or system session log in is traditionally available only for native applications. 
      As of Spring 2020, it is not possible to register a Web application for being started on OS session log in, although the early proposal exists
      to make it available for the <a href="/installation.html">installed PWAs</a>.`,
    `The proposal, not implemented by any browser yet, defines a new <code>request_on_install</code> property in <b>Web Manifest</b> that would cause the browser to display
      an additional user consent on adding the PWA to the home screen. If allowed, the Web application would be then automatically launched as if the home screen icon was clicked.`,
  ],
  api: `<p><b>Manifest Elements</b></p>
<pre><code>{
  request_on_install: ["runonstartup"]
}</code></pre>`,
  tests: [
    // no way to test the availability :(
  ],
  links: [
    {url: 'https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/master/RunOnLogin/Explainer.md', title: 'Explainer: Allow installed PWA to run on OS login'},
  ]
})
