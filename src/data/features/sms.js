import {Feature} from "../../utils/feature";

export default new Feature({
  id: 'sms',
  name: 'SMS/MMS',
  description: [
    `Allowing Web applications to gain full access to SMS and MMS messaging system on the device was a goal of <b>Messaging API</b>. 
        It was designed to cover the functionality of the native mobile messaging applications, including browsing, creating and managing the messages.
        Its early version, different than the later Messaging API proposal, was implemented only on now-defunct Firefox OS and it was the only actual implementation of SMS messaging in the Web - no browser vendor expresses an interest anymore due to privacy and security reasons.`,
    `As of early 2020, there exists another <a href="https://github.com/samuelgoto/sms-receiver/blob/master/README.md" target="_blank" rel="noopener">API proposal</a> - <b>SMS Receiver API</b> – focusing on the narrower task of delivering one-time password message when requested, to be used in multiple factor authentication schemes. The API is implemented only in Chrome 78+ and available for experimentation via <a href="https://developers.chrome.com/origintrials/#/view_trial/607985949695016961">Origin Trial</a> mechanism. It relies on the specific message format – the message is expected to contain the requesting app's URL.`
  ],
  api: `<p><b>SMS Receiver API proposal (Chrome 78+ experimentation)</b></p>
      <dl>
        <dt><code>navigator.sms.receive()</code></dt>
        <dd>Returns a <code>Promise</code> resolved with the message content when the device receives the OTP SMS message containing the requesting URL and the password.</dd>
      </dl>
      
      <p><b>Messaging API proposal (never implemented)</b></p>
      <dl>
        <dt><code>navigator.messaging.sms.send(number, message, serviceId)</code></dt>
        <dd>Sends a SMS to a specified number. The sending and delivery status was to be tracked via 
          listening to <code>onsent</code>, <code>ondeliverysuccess</code> and <code>ondeliveryerror</code> events.</dd>
        <dt><code>navigator.messaging.mms.send(content)</code></dt>
        <dd>Sends a MMS to a specified number. The sending and delivery status was to be tracked via 
          listening to <code>onsent</code>, <code>ondeliverysuccess</code> and <code>ondeliveryerror</code> events.</dd>
        <dt><code>navigator.messaging.findMessages(filter, options)</code></dt>
        <dd>Returns the <code>Promise</code> resolved with the messages matching by the filter provided.</dd>
      </dl>
      
      <p><b>Firefox OS API (now obsolete)</b></p>
      <dl>
        <dt><code>navigator.mozSms.send(number, message)</code></dt>
        <dd>Sends a SMS to a specified number. The sending and delivery status was to be tracked via 
          listening to <code>onsent</code>, <code>ondeliverysuccess</code> and <code>ondeliveryerror</code> events.</dd>
        <dt><code>navigator.mozSms.getMessages(filter)</code></dt>
        <dd>Returns the cursor that allows iterating through the messages matching the filter provided.</dd>
      </dl>
      `,
  tests: [
    Feature.navigatorContains('sms'),
    Feature.navigatorContains('messaging')
  ],
  demo: {
    html: `<p>
  <button onclick="waitForSms()">Wait for SMS</button>
</p>
<p>The demo is using <b>SMS Receiver API</b>.<br/>
  Try sending yourself a following message:</p>
   <pre>Code: 123ABC<br/>
   For: https://whatwebcando.today/sms.html</pre>`,
    js: `function waitForSms() {
  if ('sms' in navigator && 'receive' in navigator.sms) {
    navigator.sms.receive()
      .then((content) => alert('SMS received: ' + content))
      .catch((error) => alert('SMS receiving error: ' + error));
  } else {
    alert('SMS Receiver API not supported');
  }
}`,
  },
  links: [
    {url: 'https://github.com/samuelgoto/sms-receiver', title: 'Chrome\'s SMS Receiver API proposal'},
    {url: 'https://www.w3.org/TR/messaging/', title: 'Messaging API specification proposal (never implemented)'},
    {
      url: 'https://developer.mozilla.org/en-US/docs/Archive/B2G_OS/API/Mobile_Messaging_API',
      title: 'Firefox OS defunct implementation documentation'
    }
  ]
})
