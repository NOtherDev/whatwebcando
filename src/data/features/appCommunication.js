import {Feature} from "../../utils/feature";

export default new Feature({
  id: 'app-communication',
  name: 'Inter-App Communication',
  description: [`There were several attempts to establish the universal, multi-platform, asynchronous way of data exchange from the Web applications to native apps or another Web apps and up to date no standardized solution was concieved.`,
    `There are, however, some basic workarounds for sending data to another applications. Native applications can register handlers to receive data from the Web apps using special URL prefixes (although differences exist between <a href="https://developer.apple.com/library/ios/documentation/iPhone/Conceptual/iPhoneOSProgrammingGuide/Inter-AppCommunication/Inter-AppCommunication.html#//apple_ref/doc/uid/TP40007072-CH6-SW1" target="_blank" rel="noopener">iOS</a> and <a href="https://developer.android.com/training/app-links/index.html" target="_blank" rel="noopener">Android</a>). There are also third-party non-standard services that coordinate sharing data between Web applications.`,
    `Google Chrome 18 implemented the <b>Web Intents</b> experimental API. It was conceptually based on <a href="https://developer.android.com/guide/components/intents-filters.html" target="_blank" rel="noopener">Android Intents</a> system. The apps interested in receiving data were required to be registered in Chrome Web Store and declare the intent support in the manifest file. The apps sending the data were able to invoke the Intent of the particular type and let the system handle the selection of the target application and its proper invocation. The API was removed in Chrome 24 because of various interoperability and usability issues. No other vendor implemented Web Intents.`,
    `The newest implementation, <b>Web Share API</b>, as of September 2017 available in Chrome on Android, is much simpler and consists of a method to invoke the platform-specific share mechanism and is limited to sharing named URLs only. There is a complementary <b>Web Share Target API</b> <a href="https://github.com/WICG/web-share-target" target="_blank">in an early design phase</a> to allow registering Web applications as the share receivers.`],
  api: `<p><b>Web Intents API</b></p>
      <dl>
        <dt><code>intent = new Intent(action, type, href)</code></dt>
        <dd>Creates an object representing the request for a particular action (command) to be sent to the registered handling applications.</dd>
        <dt><code>navigator.startActivity(intent, onSuccess, onFailure)</code></dt>
        <dd>Invokes the system-defined application selection and data share dialog to send the request to another application.</dd>
        <dt><code>window.intent.postResult(result)</code></dt>
        <dd>Sends the <code>result</code> from the requested (target) application back to the requesting (source) application.</dd>
      </dl>
      <p><b>Web Share API</b></p>
      <dl>
        <dt><code>navigator.share({name, title, url})</code></dt>
        <dd>Invokes the system-defined application selection and data share dialog to send the named URL to another application and returns a <code>Promise</code> resolved when the share was successful.</dd>
      </dl>`,
  tests: [
    Feature.windowContains('Intent', false),
    Feature.navigatorContains('share')
  ],
  caniuse: 'web-share',
  demo: {
    html: `<p>
  <button onclick="intent()">Share whatwebcando.today<br>with <b>Web Intents</b></button>
</p>

<p>
  <button onclick="share()">Share whatwebcando.today<br>with <b>Web Share</b></button>
</p>`,
    js: `function intent() {
  if (!("Intent" in window)) {
    alert('Web Intents API not supported.');
    return;
  }

  var intent = new Intent('http://webintents.org/share',
    'text/uri-list',
    'https://whatwebcando.today');
  navigator.startActivity(intent, function () {
    console.log('Successful share')
  }, function (error) {
    console.log('Error sharing:', error);
  });
}

function share() {
  if (!("share" in navigator)) {
    alert('Web Share API not supported.');
    return;
  }

  navigator.share({
      title: 'What Web Can Do Today',
      text: 'Can I rely on the Web Platform features to build my app? An overview of the device integration HTML5 APIs',
      url: 'https://whatwebcando.today/'
    })
    .then(() => console.log('Successful share'))
    .catch(error => console.log('Error sharing:', error));
}`
  },
  links: [
    {url: 'https://www.w3.org/TR/web-intents/', title: 'W3C Working Group Note about Web Intents'},
    {
      url: 'https://www.chromium.org/developers/web-intents-in-chrome',
      title: 'Web Intents in Chrome - description from 2012'
    },
    {
      url: 'https://paul.kinlan.me/what-happened-to-web-intents/',
      title: 'Paul Kinlan: What happened to Web Intents?'
    },
    {
      url: 'https://paul.kinlan.me/navigator.share/',
      title: 'Paul Kinlan: Simple sharing on the Web with navigator.share'
    },
    {url: 'https://wicg.github.io/web-share/', title: 'Web Share API Specification'}
  ]
})
