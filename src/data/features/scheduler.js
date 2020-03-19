import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'scheduler',
  name: 'Task Scheduling',
  description: [`The first attempt to provide the Web applications an ability to be notified according to the system-level scheduler was called <strong>Web Alarms API</strong>. 
      It was abandoned in 2013 in favor of the newer <strong>Task Scheduler API</strong> proposal based on Service Worker primitives.`,
    `The API's idea is to act as a wrapper for the underlying operating system scheduler and allow authorized Web applications implementing scenarios such as alarms, reminders or periodic data synchronization.
      It is supposed to be able to wake up the system at the specific time or in the first possible moment after the scheduled time and run the user-defined handler within the Service Worker instance.`,
    `The API is not implemented by any browser vendor as of the end of 2017 and no browser vendor seem to signal any interest.`],
  api: `<dl>
        <dt><code>navigator.serviceWorker.getRegistration()</code><br>
          <code>&nbsp;&nbsp;.then(reg => reg.taskScheduler.add(time, [data])</code></dt>
        <dd>Schedules an event to be triggered within the Service Worker instance at the specified <code>time</code> with the specified <code>data</code> payload.</dd>
        <dt><code>reg.taskScheduler.getPendingTasks()</code></dt>
        <dd>Returns a <code>Promise</code> resolved with the events already scheduled by the current application.</dd>
        <dt><code>self.addEventListener('task', listener)</code></dt>
        <dd>An event fired within the Service Worker at the scheduled time (or as soon as it is possible after) with the <code>task</code> data.</dd>
      </dl>`,
  tests: [
    Feature.navigatorContains('alarms', false),
    Feature.serviceWorkerRegistrationContains('taskScheduler')
  ],
  links: [
    {url: 'https://www.w3.org/TR/task-scheduler/', title: 'Task Scheduler API specification proposal'},
    {url: 'https://www.w3.org/TR/2013/WD-web-alarms-20130205/', title: 'Web Alarms API abandoned proposal'}
  ]
})
