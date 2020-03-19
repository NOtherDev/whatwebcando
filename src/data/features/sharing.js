import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'sharing',
  aliases: ['app-communication'],
  name: 'Inter-App Sharing',
  description: [
    `There were several attempts to establish the universal, multi-platform, asynchronous way of data exchange from the Web applications to native apps or another Web apps. The implementation that is being introduced since 2017, available on Android and iOS, <b>Web Share API</b>, consists of a method to invoke the platform-specific share mechanism, passing named URL to it. Additionally, Google Chrome on Android supports sharing file objects.`,
    `There is a complementary <b>Web Share Target API</b> available in Android since Chrome 71 (late 2018) to allow registering <a href="/installation.html">installed Web Application</a> to be available in the platform-specific share mechanism. It is based on the <code>share_target</code> definition in the app's Manifest file. This way the user is able to send data to the specified endpoint in the application from any other application (Web or native) installed in the system.`,
    `Historically, There were few basic workarounds used for sending data to another applications that might still be relevant. Native applications can register handlers to receive data from the Web apps using special URL prefixes (although differences exist between <a href="https://developer.apple.com/library/ios/documentation/iPhone/Conceptual/iPhoneOSProgrammingGuide/Inter-AppCommunication/Inter-AppCommunication.html#//apple_ref/doc/uid/TP40007072-CH6-SW1" target="_blank" rel="noopener">iOS</a> and <a href="https://developer.android.com/training/app-links/index.html" target="_blank" rel="noopener">Android</a>). There are also third-party non-standard services that coordinate sharing data between Web applications.`,
    `The first attempt to tackle data sharing from the web – the <b>Web Intents</b> experimental API – was implemented in Google Chrome 18 (in 2012). It was conceptually based on <a href="https://developer.android.com/guide/components/intents-filters.html" target="_blank" rel="noopener">Android Intents</a> system. The apps interested in receiving data were required to be registered in Chrome Web Store and declare the intent support in the manifest file. The apps sending the data were able to invoke the Intent of the particular type and let the system handle the selection of the target application and its proper invocation. The API was removed in Chrome 24 because of various interoperability and usability issues. No other vendor implemented Web Intents.`,
    ],
  api: `<p><b>Web Share API</b></p>
      <dl>
        <dt><code>navigator.share({name, title, url, files})</code></dt>
        <dd>Invokes the system-defined application selection and data share dialog to send the named URL and/or files to another application and returns a <code>Promise</code> resolved when the share was successful.</dd>
        <dt><code>navigator.canShare({files})</code></dt>
        <dd>Checks the ability of <code>navigator.share</code> to accept the particular data to be shared, returns <code>true</code> if so. Useful to determine whether file sharing is available.</dd>
      </dl>
      
      <p><b>Web Share Target API</b></p>
      <p>Addition to Manifest file</p>
      <pre><code>{
  "share_target": {
  "action": "/share-target/",
  "method": "GET",
  "enctype": "application/x-www-form-urlencoded",
  "params": {
    "title": "title",
    "text": "text",
    "url": "url"
  }
}</code></pre>
      
      <p><b>Web Intents API (obsolete)</b></p>
      <dl>
        <dt><code>intent = new Intent(action, type, href)</code></dt>
        <dd>Creates an object representing the request for a particular action (command) to be sent to the registered handling applications.</dd>
        <dt><code>navigator.startActivity(intent, onSuccess, onFailure)</code></dt>
        <dd>Invokes the system-defined application selection and data share dialog to send the request to another application.</dd>
        <dt><code>window.intent.postResult(result)</code></dt>
        <dd>Sends the <code>result</code> from the requested (target) application back to the requesting (source) application.</dd>
      </dl>`,
  tests: [
    Feature.navigatorContains('share'),
    Feature.navigatorContains('canShare'),
    Feature.windowContains('Intent', false),
  ],
  caniuse: 'web-share',
  demo: {
    html: `<p>
  <button onclick="share()">Share whatwebcando.today<br>with <b>Web Share</b></button>
</p>

<p>
  <button onclick="intent()">Share whatwebcando.today<br>with <b>Web Intents</b></button>
</p>`,
    js: `function share() {
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
}

function intent() {
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
}`
  },
  links: [
    {url: 'https://wicg.github.io/web-share/', title: 'Web Share API Specification'},
    {url: 'https://github.com/WICG/web-share-target', title: 'Web Share Target API Specification'},
    {
      url: 'https://paul.kinlan.me/navigator.share/',
      title: 'Paul Kinlan: Simple sharing on the Web with navigator.share'
    },
    {
      url: 'https://paul.kinlan.me/what-happened-to-web-intents/',
      title: 'Paul Kinlan: What happened to Web Intents?'
    },
    {url: 'https://www.w3.org/TR/web-intents/', title: 'W3C Working Group Note about Web Intents'},
    {
      url: 'https://www.chromium.org/developers/web-intents-in-chrome',
      title: 'Web Intents in Chrome - description from 2012'
    },
  ]
})
