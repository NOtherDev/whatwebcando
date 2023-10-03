---
title: How to use Chrome Dev Tools Service Worker switches
image: /articleimgs/analogue-console-control.pexels.jpg
tags: [PWA, Service Worker]
description: Google Chrome, as expected from the Service Worker API and whole Progressive Web Apps ideas main proponent, offers probably the richest developer tooling to ease the debugging, testing and experimenting with the APIs. Chrome's Dev Tools has a whole Application tab dedicated to PWA-related matters.
weight: 2
---

Google Chrome, as expected from the Service Worker API and whole Progressive Web Apps ideas main proponent, offers probably the richest developer tooling to ease the debugging, testing and experimenting with the APIs. Chrome's Dev Tools has a whole Application tab dedicated to PWA-related matters. 

This tab offers the ability to inspect and clear the data in all the available storage types (Local Storage, Session Storage, IndexedDB, obsolete Web SQL, Cookies and Cache API) as well as to trace background services' activity (including Background Fetch, [Background Sync](https://whatwebcando.today/background-sync.html), [Notifications](https://whatwebcando.today/local-notifications.html), [Push API](https://whatwebcando.today/push-notifications.html) and [Payments](https://whatwebcando.today/payments.html). There's also a separate page for Service Worker inspection, and this is where we're going to have a closer look at the three small checkboxes at the top.

<figure>
  <img src="/articleimgs/chrome-switch-update-on-reload.png" alt="Chrome's Application tab switches" />
  <figcaption>Google Chrome's Dev Tools Application tab switches</figcaption>
</figure>

## "Offline" switch

The first one is Offline switch. It's the most self-describing one. By checking it we simulate the lack of internet connectivity from our tab, causing all the network requests to fail and letting us test our offline behaviors. It is equivalent to setting the network emulation to Offline in the Network tab - both do exactly the same and both are issuing a yellow warning badge to save us from unnecessary debugging when we forgot we turned this feature on.

<figure>
  <img src="/articleimgs/chrome-switch-disable-cache.png" alt="Chrome's Network throttling dropdown" />
  <figcaption>Setting the network throttling to "Offline" is equivalent to Service Worker's "Offline" switch</figcaption>
</figure>

All the requests will fail to reach the network, so their Promises will get rejected without creating the `Response` object. 

**When to switch it ON?** When testing the [offline state](https://whatwebcando.today/offline.html) caches and behaviors of our Progressive Web App.

## "Update on reload" switch

![How to use Chrome Dev Tools Service Worker switches](/articleimgs/analogue-console-control.pexels.jpg)

"Update on reload" checkbox is definitely less self-describing. It alters the rule when the browser checks for the new Service Worker version and when that new version is activated, in case it was found. Normally, when the switch is off (or when there's no Dev Tools opened), browsers have its rules how often to check for the new version – Chrome doesn't do that more often than once a day. Also, activating the new version of the Service Worker after it was deployed over the old one requires one of the two things to happen: either closing all the tabs of the application (or hard-refreshing them), so that the number of the previous Service Worker's clients fall down to 0 and it can safely be disposed, or calling `self.skipWaiting()` by the newly installed Service Worker, in case it's OK to take over the existing clients in the middle of their lifetime. Both options has its downsides and [implementing the full and bullet-proof update flow for the Service Worker is tricky](/articles/handling-service-worker-updates). And especially in the development, it's rather annoying that the Service Worker we expect to be running might either be unnoticed by the browser yet or it might be idly waiting for its moment to activate and we might be spending our time uselessly debugging the outdated version of our code.

By checking "Update on reload" we effectively ask our browser to unconditionally check if there's a new Service Worker version available and if so, we ask that new Service Worker to `skipWaiting` immediately after it gets installed without the need to close the tabs or go through the standard update flow. It's like we'd implement a call to `skipWaiting()` as a part of the new Service Worker's `install` handler, asking it to forcefully take over all the clients. This is not necessarily what we want in production to happen, but it could save us some time and inconvenience at the development time.

The update forced by "Update on reload" is an ordinary one. It causes all the installation and activation phases to run in the Service Worker as well as it is communicated to the clients with `updatefound` and `controllerchange` events. So in case we refresh all the open tabs of our application on `controllerchange` event, we need to be aware that it would happen every time we refresh any of our tabs. Also, due to what [seems to be a long-standing Dev Tools bug](https://github.com/google/WebFundamentals/pull/5536/files), we need to add an additional check to ensure we only refresh it once, because apparently with "Update on reload" checked, our `controllerchange` event might be triggered multiple times, causing an infinite refresh loop:

```
var preventDevToolsReloadLoop;
navigator.serviceWorker.addEventListener('controllerchange', (event) => {
    // Ensure refresh is only called once.
    // This works around a bug in "force update on reload".
    if (preventDevToolsReloadLoop) return;
    preventDevToolsReloadLoop = true;
    window.location.reload();
});
```

**When to switch it ON?** All the time in development, except when we're actually working on the Service Worker update flow for our app (because, with the switch ON, we won't be able to test it reliably).

## "Bypass for network" switch

The role of the last switch, "Bypass for network", might also not be obvious. It is there to disable Service Worker-level caching to ensure that in development we never hit the cache and always reproduce the behavior corresponding to the first visit (with no Service Worker active yet). 

Technically, this is achieved by ignoring the `fetch` event handler, so we need to be aware of all its consequences, apart from the intended one – getting no responses from Cache API. None of the code we put in `fetch` handler gets called, so nothing is written to the cache, no `console.log`s from `fetch` or no Service Worker-side routing happens. Whatever we put into the `fetch` handler, with this switch turned on, is a dead code.

On the other hand, we need to be aware that it is distinct from the well-known "Disable cache" switch from the Network tab:

<figure>
  <img src="/articleimgs/chrome-switch-disable-cache.png" alt="Chrome's Network tab 'Disable cache' switch" />
  <figcaption>Chrome's Network tab "Disable cache' switch, NOT equivalent to Application tab "Bypass for network" switch</figcaption>
</figure>

That one over there turns off the browser-level HTTP cache only, which is one level below in the stack, while "Bypass for network" in turn only disables the Service Worker behavior. And as both the switches work independently, we will not actually hit the network despite "Bypass for network" turned on in case we don't have "Disable cache" also enabled and when our HTTP-level cache has a response for us to serve. From the Service Worker perspective, such a request is served "by network" and it is oblivious of how the network stack below works.

**When to switch it ON?** It might be useful to determine if the cause for data inconsistency is at the Service Worker caching layer. Might also be useful in case our app heavily uses [cache-first offline handling strategies](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook#cache-falling-back-to-network). For the most time in development, it should be fine not to use it, though.


