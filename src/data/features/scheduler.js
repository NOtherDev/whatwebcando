import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'scheduler',
  name: 'Task Scheduling',
  description: [
    `Despite several specification attempts, there is no generic task scheduler available for the Web applications as of early 2020. There is however an active attempt to solve one of the most prominent use case for scheduler – data synchronization. 
    The proposal is called <strong>Periodic Background Sync API</strong> and it complements the <a href="/background-sync.html">Background Sync</a> capability. It allows the Web applications to register for the periodic event
    that causes the Service Worker to be woken up and make it possible to execute HTTP request without user interaction.`,
    `The API, as of early 2020, is experimentally available in Google Chrome 80+ only and its usage is restricted to <a href="/installation.html">installed</a> applications 
    with high enough engagement score. The API does not guarantee the interval of the synchronization – it allows requesting minimum interval via <code>minInterval</code> parameter, although to avoid abuse, the actual interval is dependent on the number of factors
     such as the network trustworthiness and the frequency the user uses the app.`,
    `The earliest attempt to provide the Web applications an ability to be notified according to the system-level scheduler was called <strong>Web Alarms API</strong>. It was abandoned in 2013 in favor of the newer <strong>Task Scheduler API</strong> proposal based on Service Worker primitives
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
  tests: [
    Feature.serviceWorkerRegistrationContains('periodicSync'),
    Feature.serviceWorkerRegistrationContains('taskScheduler', false),
    Feature.navigatorContains('alarms', false),
  ],
  links: [
    {url: 'https://webplatformapis.com/periodic_sync/periodicSync_improved.html', title: 'Demo application for Periodic Background Sync API'},
    {url: 'https://github.com/WICG/BackgroundSync/blob/master/explainers/periodicsync-explainer.md', title: 'Periodic Background Sync API explainer'},
    {url: 'https://web.dev/periodic-background-sync/', title: 'Richer offline experiences with the Periodic Background Sync API'},
    {url: 'https://www.w3.org/TR/task-scheduler/', title: 'Task Scheduler API specification proposal'},
    {url: 'https://www.w3.org/TR/2013/WD-web-alarms-20130205/', title: 'Web Alarms API abandoned proposal'}
  ]
})
