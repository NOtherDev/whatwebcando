import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'background-sync',
  name: 'Background Sync',
  description: [`The <b>Background Sync API</b> allows authorized Web applications to not rely on having stable internet connection 
        and defer network-related operations to the moment the connection is available. The API is bound to the Service Worker, which is 
        the code execution model that is separated from the owning Web application. This allows the Background Sync to operate also after 
        the application window was closed.`,
    `The API itself is only a way of signaling the application about the restored connectivity. It might be used together with any
        <a href="/storage.html">Offline Storage</a> solution to implement a data synchronization scheme or a replay mechanism for 
        the network requests issued when the application was offline`,
    `As of early 2020, the API is only implemented in Chromium-based browsers.`,
    `The specification is complemented with <a href="/scheduler.html">Periodic Background Sync</a> that allows requesting periodic events waking up the Service Worker, useful for automatic data synchronization scenarios.`,
    ],
  api: `<dl>
        <dt><code>serviceWorkerRegistration.sync.register('syncTag')</code></dt>
        <dd>Requests an one-off sync registration. Returns a <code>Promise</code> when the request has been registered.</dd>
        <dt><code>self.addEventListener('sync', listener)</code></dt>
        <dd>An event fired within the Service Worker instance when there is a connection available and the synchronization is possible. The <code>listener</code> is expected to call <code>event.waitUntil(promise)</code> specifying a <code>Promise</code> that resolves when the sync handling has been completed.</dd>
      </dl>`,
  tests: [Feature.windowContains('SyncManager')],
  caniuse: 'background-sync',
  links: [
    {url: 'https://wicg.github.io/BackgroundSync/spec/', title: 'Specification Draft (non-W3C)'},
    {
      url: 'https://developers.google.com/web/updates/2015/12/background-sync',
      title: 'Google Developers: Introducing Background Sync'
    }
  ]
})
