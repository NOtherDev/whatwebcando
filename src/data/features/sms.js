import {Feature} from "../../utils/feature";

export default new Feature({
  id: 'sms',
  name: 'SMS/MMS',
  description: [`Allowing Web applications to access SMS and MMS messages on the device was a goal of <b>Messaging API</b>. 
        It was designed to cover the functionality of the native mobile messaging applications, including browsing, creating and managing the messages.
        Its early version was implemented only on now-defunct Firefox OS. As of late 2017 it was the only actual implementation of SMS messaging in the Web - no browser vendor expresses an interest anymore.`,
    `There exists another SMS-related <a href="https://discourse.wicg.io/t/proposal-sign-up-api-for-web/1844" target="_blank" rel="noopener">API proposal</a> to focus on SMS 
        as a carrier of one-time password to be used in multiple factor authentication schemes. As of end of 2017 this proposal is still in early design phase.`],
  api: `<p><b>Firefox OS API</b></p>
      <dl>
        <dt><code>navigator.mozSms.send(number, message)</code></dt>
        <dd>Sends a SMS to a specified number. The sending and delivery status was to be tracked via 
          listening to <code>onsent</code>, <code>ondeliverysuccess</code> and <code>ondeliveryerror</code> events.</dd>
        <dt><code>navigator.mozSms.getMessages(filter)</code></dt>
        <dd>Returns the cursor that allows iterating through the messages matching the filter provided.</dd>
      </dl>
      <p><b>Messaging API proposal</b></p>
      <dl>
        <dt><code>navigator.messaging.sms.send(number, message, serviceId)</code></dt>
        <dd>Sends a SMS to a specified number. The sending and delivery status was to be tracked via 
          listening to <code>onsent</code>, <code>ondeliverysuccess</code> and <code>ondeliveryerror</code> events.</dd>
        <dt><code>navigator.messaging.mms.send(content)</code></dt>
        <dd>Sends a MMS to a specified number. The sending and delivery status was to be tracked via 
          listening to <code>onsent</code>, <code>ondeliverysuccess</code> and <code>ondeliveryerror</code> events.</dd>
        <dt><code>navigator.messaging.findMessages(filter, options)</code></dt>
        <dd>Returns the <code>Promise</code> resolved with the messages matching by the filter provided.</dd>
      </dl>`,
  tests: [
    Feature.navigatorContains('sms'),
    Feature.navigatorContains('mms'),
    Feature.navigatorContains('messaging')
  ],
  links: [
    {url: 'https://www.w3.org/TR/messaging/', title: 'Messaging API specification proposal'},
    {
      url: 'https://developer.mozilla.org/en-US/docs/Archive/B2G_OS/API/Mobile_Messaging_API',
      title: 'Firefox OS defunct implementation documentation'
    }
  ]
})
