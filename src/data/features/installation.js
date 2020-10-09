import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'installation',
  name: 'Home Screen Installation',
  description: [
    `Web applications can provide the <code>manifest.json</code> file, standardized as the <b>Web Manifest</b>, specifying the features
       and behaviors needed in order to treat the application as a first-class citizen on the target platform, i.e. adding ("installing") to the home screen
       with the relevant icon, full screen behaviors, themes, standalone appearance without browser bar etc. It can also serve as a centralized place
       to put all the metadata associated with the Web application.`,
    `Having the Web Manifest is one of the key factors (apart from being served via HTTPS and providing
       a Service Worker-based offline behavior – see <a href="/offline.html">Offline Mode</a>) for the Web applications to be treated
       as a <b><a href="https://developers.google.com/web/progressive-web-apps" target="_blank" rel="noopener">Progressive Web App</a></b> (PWA). Such applications
       get "add to home screen" UX in most desktop and Android browsers, i.e. the icon in the address bar.`,
    `Google Chrome additionally presents an additional on-screen banner prompting user to install the app based on usage heuristic. The banner might be cancelled
      or replaced with custom installation UX using <code>beforeinstallprompt</code> event.`,
    `When the application is added to the home screen, its icon might additionally present a badge (notification dot or number) using <b>Badging API</b>, as of Spring 2020 available in Google Chrome only.`,
    `Browser-assisted adding to the home screen also used to be possible on iOS using <a href="https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html" target="_blank" rel="noopener">non-standard Apple meta tags</a>
       describing icons and allowing to run without the Safari UI (standalone mode).`
  ],
  api: `<p><b>Manifest Elements</b></p>
<pre><code>{
  "short_name": "Example App",
  "name": "The Example Application",
  "icons": [
    {
      "src": "launcher-icon-1x.png",
      "sizes": "48x48"
    },
    {
      "src": "launcher-icon-2x.png",
      "sizes": "96x96"
    }
  ],
  "theme_color": "#ff0000",
  "background_color": "#ff0000",
  "start_url": "index.html",
  "display": "standalone"
}</code></pre>
<p>See also <b><a href="manifest.json" target="_blank">this website's own manifest.json</a></b>.</p>
<p><b>Install Banner API</b></p>
<dl>
  <dt><code>window.addEventListener('beforeinstallprompt')</code></dt>
  <dd>An event fired when the browser's heuristic decides to display the "add to home screen" banner to the user. Allows tracking the user's decision and presenting the banner from the custom UI.</dd>
  <dt><code>event.prompt()</code></dt>
  <dd>Triggers displaying the "add to home screen" banner from the custom UI.</dd>
  <dt><code>event.userChoice</code></dt>
  <dd>Returns <code>Promise</code> resolved with the outcome of the "add to home screen" banner – either <code>accepted</code> or <code>dismissed</code>.</dd>
  <dt><code>window.addEventListener('appinstalled')</code></dt>
  <dd>An event fired when the Web application has been successfully added to the user's home screen.</dd>
</dl>

<p><b>Badging API</b></p>
<dl>
  <dt><code>navigator.setAppBadge([number])</code></dt>
  <dd>Sets the badge (dot) on the installed app's icon on the home screen, with the optional <code>number</code> in case the underlying platform allows it.</dd>
  <dt><code>navigator.clearAppBadge()</code></dt>
  <dd>Clears the previously set badge from the installed app's icon.</dd>
</dl>`,
  caniuse: 'web-app-manifest',
  tests: [
    Feature.windowContains('BeforeInstallPromptEvent'),
    Feature.navigatorContains('setAppBadge'),
  ],
  links: [
    {url: 'https://w3c.github.io/manifest/', title: 'Specification Draft'},
    {
      url: 'https://developers.google.com/web/updates/2014/11/Support-for-installable-web-apps-with-webapp-manifest-in-chrome-38-for-Android?hl=en',
      title: 'Installable Web Apps with the WebApp Manifest in Chrome for Android'
    },
    {
      url: 'http://html5doctor.com/web-manifest-specification/',
      title: 'HTML5 Doctor: The Web Manifest specification'
    },
    {url: 'http://brucelawson.github.io/manifest/', title: 'Manifest Generator by Bruce Lawson'},
    {url: 'https://pwa.rocks/', title: 'A selection of Progressive Web Apps'},
    {
      url: 'https://developers.google.com/web/fundamentals/engage-and-retain/app-install-banners/',
      title: 'Google Developers: Web App Install Banners'
    },
    {url: 'https://web.dev/badging-api/', title: 'Badging for app icons'},
  ]
})
