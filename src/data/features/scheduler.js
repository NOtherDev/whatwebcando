import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'scheduler',
  name: 'Task Scheduling',
  description: [
    `There is no generic task scheduler available for the Web applications as of early 2020. There are however few active attempts to solve the most prominent use cases for scheduler, separately.`,
    `The first proposal is called <strong>Periodic Background Sync API</strong> and it addresses the background data synchronization use case. It complements the <a href="/background-sync.html">Background Sync</a> capability. It allows the Web applications to register for the periodic event
    that causes the Service Worker to be woken up and make it possible to execute HTTP request without user interaction.
    The API, as of early 2020, is experimentally available in Google Chrome 80+ only and its usage is restricted to <a href="/installation.html">installed</a> applications 
    with high enough engagement score. The API does not guarantee the interval of the synchronization – it allows requesting minimum interval via <code>minInterval</code> parameter, although to avoid abuse, the actual interval is dependent on the number of factors
     such as the network trustworthiness and the frequency the user uses the app.`,
    `The second proposal is called <strong>Notification Trigger API</strong>. It is an extension to the existing <a href="/local-notifications.html">Notifications API</a> that allows the
    local notification to be deferred and scheduled to be shown according to the external trigger – i.e. time- or location-based. The notification needs to be pre-created and the API doesn't
    allow any code to be executed at the trigger. The API is only available in Google Chrome 80+ via <a href="https://developers.chrome.com/origintrials/#/view_trial/6883752030435803137" target="_blank" rel="noopener">Origin Trial</a> experimentation
    and as of early 2020 is limited to time-based triggers.`,
    `Historically, the earliest attempt to provide the Web applications an ability to be activated according to the system-level scheduler was called <strong>Web Alarms API</strong>. It was abandoned in 2013 in favor of the newer <strong>Task Scheduler API</strong> proposal based on Service Worker primitives
    that in turn was abandoned as too generic and open for abuse. Its idea was to act as a wrapper for the underlying operating system scheduler and allow authorized Web applications implementing broad scenarios such as alarms, reminders or periodic data synchronization.
      It was supposed to wake up the system at the specific time or in the first possible moment after the scheduled time and run the user-defined handler within the Service Worker instance.`],
  api: `<p><b>Periodic Background Sync API (experimental)</b></p>
      <dl>
        <dt><code>navigator.serviceWorker.getRegistration()</code><br>
          <code>&nbsp;&nbsp;.then(reg => reg.periodicSync.register(tag, {minInterval})</code></dt>
        <dd>Requests an event to be triggered within the Service Worker instance at the specified minimum interval <code>minInterval</code> with the specified <code>tag</code>.</dd>
        <dt><code>reg.periodicSync.getTags()</code></dt>
        <dd>Returns a <code>Promise</code> resolved with the sync requests already registered by the current application.</dd>
        <dt><code>self.addEventListener('periodicsync', listener)</code></dt>
        <dd>An event fired within the Service Worker periodically (at the browser-controlled interval) with the <code>tag</code>, allowing data fetch.</dd>
      </dl>
      
      <p><b>Notification Trigger API (experimental)</b></p>
      <dl>
        <dt><code>const trigger = new TimestampTrigger(timestamp)</code></dt>
        <dd>Creates a time-based trigger that will activate on a given <code>timestamp</code>.</dd>
        <dt><code>navigator.serviceWorker.getRegistration()</code><br>
          <code>&nbsp;&nbsp;.then(reg => reg.showNotification(title, {...options, showTrigger: trigger})</code></dt>
        <dd>Schedules a local notification to be shown from within the Service Worker based on the <code>trigger</code>.
          For other Notification options, see <a href="/local-notifications.html">Local Notifications</a>.</dd>
      </dl>
      
      <p><b>Web Alarms API (never implemented)</b></p>
      <dl>
        <dt><code>navigator.serviceWorker.getRegistration()</code><br>
          <code>&nbsp;&nbsp;.then(reg => reg.taskScheduler.add(time, [data])</code></dt>
        <dd>Schedules an event to be triggered within the Service Worker instance at the specified <code>time</code> with the specified <code>data</code> payload.</dd>
        <dt><code>reg.taskScheduler.getPendingTasks()</code></dt>
        <dd>Returns a <code>Promise</code> resolved with the events already scheduled by the current application.</dd>
        <dt><code>self.addEventListener('task', listener)</code></dt>
        <dd>An event fired within the Service Worker at the scheduled time (or as soon as it is possible after) with the <code>task</code> data.</dd>
      </dl>`,
  demo: {
    html: `<p><button onclick="scheduleNotification()">Schedule notification in 10s (using Notification Trigger API)</button></p>`,
    js: `function scheduleNotification() {
  if (!('Notification' in window)) {
    alert('Notification API not supported');
    return;
  }
  if (!('showTrigger' in Notification.prototype)) {
    alert('Notification Trigger API not supported');
    return;
  }
  
  Notification.requestPermission()
    .then(() => {
      if (Notification.permission !== 'granted') {
        throw 'Notification permission is not granted';
      }
    })
    .then(() => navigator.serviceWorker.getRegistration())
    .then((reg) => {
      reg.showNotification("Hi there from the past!", {
          showTrigger: new TimestampTrigger(new Date().getTime() + 10 * 1000)
      })
    })
    .catch((err) => {
      alert('Notification Trigger API error: ' + err);
    });
}`
  },
  tests: [
    Feature.serviceWorkerRegistrationContains('periodicSync'),
    Feature.containedIn('Notification.prototype', typeof(window) !== 'undefined' && window.Notification && window.Notification.prototype, 'showTrigger'),
    Feature.serviceWorkerRegistrationContains('taskScheduler', false),
    Feature.navigatorContains('alarms', false),
  ],
  links: [
    {url: 'https://webplatformapis.com/periodic_sync/periodicSync_improved.html', title: 'Demo application for Periodic Background Sync API'},
    {url: 'https://github.com/WICG/BackgroundSync/blob/master/explainers/periodicsync-explainer.md', title: 'Periodic Background Sync API explainer'},
    {url: 'https://web.dev/periodic-background-sync/', title: 'Richer offline experiences with the Periodic Background Sync API'},
    {url: 'https://web.dev/notification-triggers/', title: 'Notification Trigger API description'},
    {url: 'https://www.w3.org/TR/task-scheduler/', title: 'Task Scheduler API specification proposal'},
    {url: 'https://www.w3.org/TR/2013/WD-web-alarms-20130205/', title: 'Web Alarms API abandoned proposal'}
  ]
})
