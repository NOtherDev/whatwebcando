import {Feature} from "../../utils/feature";

export default new Feature({
  id: 'push-notifications',
  name: 'Push Messages',
  description: [
    `Push Messaging is the well-known re-engagement mechanism from the mobile platforms. It
         allows the authorized Web applications to subscribe the user for the remotely sent messages that can trigger displaying a notification
         to the subscriber even if the Web application is not currently focused or even opened in the browser. The message can convey encrypted
         payload and can request displaying custom action buttons.`,
    `The Web Platform standard for Push Messages, <b>Push API</b>, utilizes the powerful concept of <b><a href="/offline.html">Service
         Workers</a></b>, code units installable by the Web app that execute separately from the app itself. Push API also requires HTTPS installation.`,
    `There is also a non-standard <a href="https://developer.apple.com/library/mac/documentation/NetworkingInternet/Conceptual/NotificationProgrammingGuideForWebsites/PushNotifications/PushNotifications.html#//apple_ref/doc/uid/TP40013225-CH3-SW1" target="_blank" rel="noopener">proprietary
         solution available for OS X in Safari</a>, based on Apple's own notification service, with the workflow similar to standard Push API, available via
          <code>window.safari.pushNotification</code> interface.`
  ],
  api: `<dl>
        <dt><code>serviceWorkerRegistration.pushManager.subscribe()</code></dt>
        <dd>Subscribes a user for the remote Push Messages. Returns a <code>Promise</code>.</dd>
        <dt><code>serviceWorkerRegistration.pushManager.getSubscription()</code></dt>
        <dd>Returns a <code>Promise</code> indicating current Push Messages subscription state.</dd>
        <dt><code>serviceWorker.addEventListener('push', listener)</code></dt>
        <dd>An event fired when remote push message has been received, available within Service Worker instance.</dd>
      </dl>`,
  caniuse: 'push-api',
  tests: [
    Feature.windowContains('PushManager'),
    Feature.containedIn('window.safari', typeof(window) !== 'undefined' && window.safari, 'pushNotification', false)
  ],
  links: [
    {url: 'https://w3c.github.io/push-api/', title: 'Specification Draft'},
    {
      url: 'https://developers.google.com/web/updates/2015/03/push-notificatons-on-the-open-web',
      title: 'Push Notifications on the Open Web - Chrome tutorial'
    },
    {
      url: 'https://hacks.mozilla.org/2015/10/keep-pushing-it-with-the-w3c-push-api/',
      title: 'Keep pushing it, with the W3C Push API'
    },
    {
      url: 'https://developer.mozilla.org/en-US/docs/Web/API/Push_API/Using_the_Push_API',
      title: 'MDN: Using the Push API'
    },
    {url: 'https://goroost.com/try-chrome-push-notifications', title: 'Chrome Push Notifications demo'},
    {
      url: 'https://developers.google.com/web/updates/2016/01/notification-actions',
      title: 'Google Developers: Notification Actions in Chrome 48'
    },
    {
      url: 'https://developers.google.com/web/updates/2016/03/web-push-encryption',
      title: 'Google Developers: Web Push Payload Encryption'
    }
  ]
})
