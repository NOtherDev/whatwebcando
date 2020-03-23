import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'sms',
  name: 'SMS/MMS',
  description: [
    `Allowing Web applications to gain full access to SMS and MMS messaging system on the device was a goal of <b>Messaging API</b>. 
        It was designed to cover the functionality of the native mobile messaging applications, including browsing, creating and managing the messages.
        Its early version, different than the later Messaging API proposal, was implemented only on now-defunct Firefox OS and it was the only actual implementation of SMS messaging in the Web - no browser vendor expresses an interest anymore due to privacy and security reasons.`,
    `However, there exists a <b>Web OTP API</b> proposal focusing on the much narrower task of delivering one-time password messages using SMS as a transport
      – see <a href="/credentials.html">Credentials</a> for details.`
  ],
  api: `<p><b>Messaging API proposal (never implemented)</b></p>
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
    Feature.navigatorContains('messaging')
  ],
  links: [
    {url: 'https://www.w3.org/TR/messaging/', title: 'Messaging API specification proposal (never implemented)'},
    {
      url: 'https://developer.mozilla.org/en-US/docs/Archive/B2G_OS/API/Mobile_Messaging_API',
      title: 'Firefox OS defunct implementation documentation'
    }
  ]
})
