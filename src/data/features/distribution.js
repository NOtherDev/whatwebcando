import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'distribution',
  name: 'Store Distribution',
  description: [
    `Native mobile apps are traditionally distributed through the centralized vendor-provided stores, most notably Google Play on Android and Apple Store on iOS. 
    By its nature, Web applications do not require any distribution platforms, however in order to be able to serve as a complete alternative for native approaches, the ability to distribute the Progressive Web Application (PWA) via the same stores is needed.`,
    `As of Spring 2020, <b>Apple Store</b> does not express any interest in providing this ability, so in order for the Web app to be present in iOS store, it needs to be packaged and wrapped using tools like <a href="https://cordova.apache.org/" target="_blank" rel="noopener">Apache Cordova</a> or <a href="https://phonegap.com/" target="_blank" rel="noopener">Adobe PhoneGap</a>.`,
    `On Android, in <b>Google Play</b>, the ability to distribute the PWA exists via <a href="https://developers.google.com/web/android/trusted-web-activity" target="_blank" rel="noopener">Trusted Web Activities</a> (TWA). It's a lightweight system-level wrapper that delegates all the code execution to the browser that in turn runs the underlying PWA as if it was opened by the URL.
    The Web application started via TWA is displayed without any browser UI as long as the website contains a <a href="https://developers.google.com/digital-asset-links/v1/getting-started" target="_blank" rel="noopener">Digital Asset Link</a> file, proving the relationship between the store-distributed app and its underlying Web content.`,
    `Submitting PWAs to the store is also possible in <b><a href="https://docs.microsoft.com/en-us/microsoft-edge/progressive-web-apps-edgehtml/microsoft-store" target="_blank" rel="noopener">Microsoft Store</a></b> on Windows,
      <b><a href="https://developer.kaiostech.com/getting-started/build-your-first-hosted-app/pwa-to-hosted-app" target="_blank" rel="noopener">KaiStore</a></b> on KaiOS and
      <b><a href="https://medium.com/progressivewebapps/progressive-web-apps-are-now-listed-in-samsung-galaxy-store-d302354caf52" target="_blank" rel="noopener">Galaxy Store</a></b> on Samsung devices.`
  ],
  api: `<ul>
    <li><b><a href="https://play.google.com/store/apps/details?id=today.whatwebcando.twa" target="_blank" rel="noopener">What Web Can Do distributed in Google Play</a></b> using Trusted Web Activity,</li>
    <li><a href="https://github.com/NOtherDev/whatwebcando/tree/master/twa" target="_blank" rel="noopener">Source code</a> of the TWA wrapper,</li>
    <li><a href="https://github.com/NOtherDev/whatwebcando/blob/master/static/.well-known/assetlinks.json" target="_blank" rel="noopener">Digital Asset Link</a> file proving the relationship.</li>
  </ul>`,
  tests: [
    // no way to test the availability :(
  ],
  links: [
    {
      url: 'https://developers.google.com/web/android/trusted-web-activity/quick-start',
      title: 'Web.dev: Trusted Web Activities Quick Start Guide'
    },
    {
      url: 'https://css-tricks.com/how-to-get-a-progressive-web-app-into-the-google-play-store/',
      title: 'How to Get a Progressive Web App into the Google Play Store'
    },
    {
      url: 'https://blog.ailon.org/pwa-on-windows-part-1-publishing-your-app-as-is-d884133fc96d',
      title: 'PWA on Windows. Part 1: Publishing Your App As Is'
    },
  ]
})
