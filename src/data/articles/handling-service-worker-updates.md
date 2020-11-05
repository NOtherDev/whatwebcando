---
title: Handling Service Worker updates – how to keep the app updated and stay sane
image: /articleimgs/floor-plan-on-table.pexels.jpg
tags: [Service Worker, Offline Capabilities]
description: Most of the Service Worker tutorials we can find on the Web focus on the initial development efforts needed to get the offline mode capabilities or performance gains for subsequent visits. But for production readiness, it is not enough, though. We need to have the update strategy in place not to cut off our users from actually getting the updates of our PWA.
weight: 2
---

Most of the Service Worker tutorials we can find on the Web focus on the initial development efforts needed to get the [offline mode capabilities](/offline.html) or performance gains for subsequent visits. And although it's definitely valuable for having a grasp on the advantages of employing this basic Progressive Web App building block, it's also extremely important to be aware that it's not enough. For production readiness, we need to make sure our Service Worker will be maintainable in the future. We need to have the update strategy in place not to cut off our users from actually getting the updates of our PWA.

## The update problem

Service Worker is a piece of JavaScript that works as a single controller & network proxy for all the instances of our application. That means that all the browser windows share the same active Service Worker. It has a significant consequence for the lifetime of Service Worker's code. It cannot be seamlessly updated as long as there is any window that it serves. In other words, if our users tend to forget about already opened tabs (who doesn't?) or it's in our app's nature to be opened forever (like it is for email clients, messaging apps or apps in kiosk mode, for instance), the Service Worker will be never updated, even though the browser might already have detected the pending update. 

Moreover, simple refreshing is not sufficient to make room for the new Service Worker to take over, even if there's only one tab of our application running. This is because browsers do not unload the earlier instance of the website immediately when we request the refresh – for some time the new instance being loaded exists simultaneously in the memory next to the previous one, being unloaded. So the number of windows served by the Service Worker doesn't fall down to zero in this case and the new Service Worker ready to be used can't take over. Hard-refresh (Control+Shift+R-kind) is sufficient (because it bypasses the Service Worker), but we can't expect our users to use it for the ordinary browsing.

Not applying the Service Worker update might mean that our outdated Service Worker runs for ages and serves our users with assets from the cache that we expect to already be long-forgotten. So it's a problem not to be ignored. It's the developer's worry to make sure our app will not be "frozen in the past". And we need to ensure we have a solution in place before our first Service Worker lands on production.

## First attempt – forceful takeover 

Fortunately, there is a programmatic way for the waiting Service Worker (the one that we received and installed as the newly updated controller of our app) to take over control over the existing clients. We can call `self.skipWaiting()` from within the new Service Worker – it immediately stops the previously active Service Worker and activates the new one, so that all the currently opened windows will be served by the new one.

When to call it? We may call it at the end of `install` event handling – it is what most examples on the Web do. It has a significant and often overlooked pitfall, though. All the already opened windows were loaded with the help of the previous Service Worker that potentially used different versions of the assets. Starting from the rather indeterministic point in time (possibly while the page is still being loaded), the same windows are served by the new Service Worker. Imagine what happens if our code is dynamically loaded using code-splitting or if we employ another lazy-loading techniques. Depending on the strategies we use, we might end up not being able to serve the expected asset anymore or we serve assets in incompatible version – it has a high probability of messing things up, so it's only suitable for the simplest apps, for example light on JS content websites.

<figure>
  <img src="/articleimgs/sw-updates-1.png" alt="Diagram of partial Service Worker update cycle – attempt 1" />
  <figcaption>Diagram of partial Service Worker update cycle – attempt 1</figcaption>
</figure>

## Even-more-forceful takeover

This technique is sometimes taken further by ensuring the app is never running in that half-old, half-new state. To avoid it, we may order all our opened windows (called `clients` in the Service Worker parlance) to refresh immediately after `skipWaiting` was called. There are at least two ways to do it – by iterating over `self.clients` from the newly-activated Service Worker and asking them to navigate to their current URLs:

```
// Service Worker-based solution
self.addEventListener('activate', async () => {
  // after we've taken over, iterate over all the current clients (windows)
  const tabs = await self.clients.matchAll({type: 'window'})
  tabs.forEach((tab) => {
    // ...and refresh each one of them
    tab.navigate(tab.url)
  })
})
```

...or by listening to `controllerchange` events from the app and refreshing when it happens:

```
// app-based solution
let refreshing = false;

// detect controller change and refresh the page
navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
        window.location.reload()
        refreshing = true
    }
})
```

This approach solves the previous inconsistency problem, but introduces a UX challenge. Refreshing the page without any clear sign for the user might be unexpected. And what if our user was in the middle of an important operation, for example entering credit card details to pay us for our services? Seemingly random refresh might not be what we would want then.

<figure>
  <img src="/articleimgs/sw-updates-2.png" alt="Diagram of partial Service Worker update cycle – attempt 2" />
  <figcaption>Diagram of partial Service Worker update cycle – attempt 2</figcaption>
</figure>

## Deferred takeover approach

We need to have a way to update the Service Worker and refresh without breaking the user flow. There are several approaches we can take. Which one is the right one depends on the characteristics of our app:

* it might be possible to detect a moment when the user is idle, not within any action or flow – but this kind of detection might be hard or impossible for some apps;
* we might update while transitioning between pages, if we have a Single-Page App that doesn't actually reloads between views – this is probably a moment when the active tab can be refreshed without causing harm in most apps, but what if there's an action in progress in another tab?
* finally, if we want to stay on the safe side, we might ask the user to apply the update by showing some kind of UI notification informing about the new version pending.

What Web Can Do website updates the Service Worker and refreshes while transitioning between pages as it's rather simple and it would not be especially harmful in case someone's demo opened in another tab will get refreshed.

## How can `skipWaiting` be deferred?

When we already know which of the deferring strategy we'll use, we need to have a way to actually defer the update. This means, we can no longer call `skipWaiting` within `install` handler in Service Worker – we need the app to signal the Service Worker about when it's the right time to call `skipWaiting`. This in turn means the app need to know about pending Service Worker update to take action, like to wait for the user to finish the current operation or display the "new version available" notification to the user, depending what's our refresh strategy.

The browser checks for the new Service Worker version periodically, as well as on the `navigator.serviceWorker.register()` call on every visit that happens at least 24 hours after the last Service Worker update. When the change is detected (it's a byte-by-byte content comparison), the new Service Worker is being installed (its `install` event handler is executed) as well as it is signaled to the app by `updatefound` event we can handle:

```
// get the ServiceWorkerRegistration instance
const registration = await navigator.serviceWorker.getRegistration();
// (it is also returned from navigator.serviceWorker.register() function)

if (registration) { // if there is a SW active
    registration.addEventListener('updatefound', () => {
        console.log('Service Worker update detected!');
    });
}
```

So far so good. Is this handler a good place to trigger our update UX (like that "new version available" notification)? No, it's not. At this point we only know the browser detected the Service Worker file change. The new Service Worker instance is not yet ready for activation, because its `install` handler is not yet complete and it actually may fail to install, for instance when any of its network calls fail. We must wait until the new instance is ready for activation (its state is `installed`):

```
// our new instance is visible under installing property, because it is in 'installing' state
// let's wait until it changes its state
registration.installing.addEventListener('statechange', () => {
    if (registration.waiting) {
        // our new instance is now waiting for activation (its state is 'installed')
        // we now may invoke our update UX safely
    } else {
        // apparently installation must have failed (SW state is 'redundant')
        // it makes no sense to think about this update any more
    }
});
```

By ensuring our update UX is only triggered when we're sure there's a Service Worker instance visible under `registration.waiting` (successfully installed, waiting for activation), we avoid running it senselessly for failed updates or too quickly, when the installation is still in progress.

Now, the third step in this update dance is to actually signal our new Service Worker instance when the user (or our heuristic) decided it's a good time to apply the update. It's the Service Worker that needs to call `skipWaiting` and we can only communicate with it by sending it a message with `postMessage` API:

```
notificationBanner.addEventListener('click', () => {
    registration.waiting.postMessage('SKIP_WAITING');
});
```

To receive the message in the Service Worker, we need to register a `message` event handler:

```
self.addEventListener('message', (event) => {
    if (event.data === 'SKIP_WAITING') {
        self.skipWaiting();
    });
});
```

Given we have `controllerchange` event handler ready at the app side, as we sketched it already, sending `SKIP_WAITING` message to the new Service Worker will cause it to activate and subsequently all the tabs to refresh, removing any inconsistency risk.

<figure>
  <img src="/articleimgs/sw-updates-3.png" alt="Diagram of full Service Worker update cycle" />
  <figcaption>Diagram of full Service Worker update cycle</figcaption>
</figure>

Last thing to think about is what happens when the user ignores our update prompt. If we only trigger it based on `updatefound` event, we have a single window of opportunity. The solution would be to additionally check for `registration.waiting` instance existence on every page load. If we detect something there, it must mean the user ignored our update UX in one of the previous page views and we should somehow act on it (either show the prompt once again or invoke the update immediately, in case it makes sense in our app).

## In code we trust

Here is the full app-side code of the proposed solution, based on explicit user prompt to apply the update (note the UI notification element itself is not included):

```
function invokeServiceWorkerUpdateFlow(registration) {
    // TODO implement your own UI notification element
    notification.show("New version of the app is available. Refresh now?");
    notification.addEventListener('click', () => {
        if (registration.waiting) {
            // let waiting Service Worker know it should became active
            registration.waiting.postMessage('SKIP_WAITING')
        }
    })
}

// check if the browser supports serviceWorker at all
if ('serviceWorker' in navigator) {
    // wait for the page to load
    window.addEventListener('load', async () => {
        // register the service worker from the file specified
        const registration = await navigator.serviceWorker.register('/service-worker.js')

        // ensure the case when the updatefound event was missed is also handled
        // by re-invoking the prompt when there's a waiting Service Worker
        if (registration.waiting) {
            invokeServiceWorkerUpdateFlow(registration)
        }

        // detect Service Worker update available and wait for it to become installed
        registration.addEventListener('updatefound', () => {
            if (registration.installing) {
                // wait until the new Service worker is actually installed (ready to take over)
                registration.installing.addEventListener('statechange', () => {
                    if (registration.waiting) {
                        // if there's an existing controller (previous Service Worker), show the prompt
                        if (navigator.serviceWorker.controller) {
                            invokeServiceWorkerUpdateFlow(registration)
                        } else {
                            // otherwise it's the first install, nothing to do
                            console.log('Service Worker initialized for the first time')
                        }
                    }
                })
            }
        })

        let refreshing = false;

        // detect controller change and refresh the page
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!refreshing) {
                window.location.reload()
                refreshing = true
            }
        })
    })
}
```

And at the Service Worker side (ensure not to have `self.skipWaiting()` call in the `install` handler):

```
self.addEventListener('message', (event) => {
    if (event.data === 'SKIP_WAITING') {
        self.skipWaiting();
    });
});
```

## Chrome Dev Tools support

The whole process is quite complex and it might be extremely difficult to debug. Fortunately, Google Chrome's Dev Tools can support us here thanks to the features from Application > Service Worker section. Firstly, it nicely visualizes the states of our Service Worker instances with colored marbles. It's clearly visible when the new instance is being installed or when it's waiting for its takeover moment.

<figure>
  <img src="/articleimgs/sw-updates-4.png" alt="Chrome Dev Tools - Application - Service Worker tab and its useful controls" />
  <figcaption>Chrome Dev Tools - Application - Service Worker tab and its useful controls</figcaption>
</figure>

It also provides two useful buttons with self-descriptive labels: "update" forces a check for new Service Worker version, "skipWaiting" on the waiting instance activates it immediately. The real deal is with "Update on reload" switch, though. When turned on, it removes the need for the whole flow and activates the Service Worker immediately after it has been installed. This is very useful in everyday development when deferred updates and Service Worker-level caches will make the development experience pretty cumbersome. On the other hand, we need to make sure the switch is OFF when we're working on the actual flow, so that it doesn't interfere with the ordinary user flow.

## **

Whichever strategy of handling Service Worker updates we apply, it has its own cons and probably means the traditional trait of the ever-green Web with no need to apply updates is more or less broken. That's the unfortunate side of how Service Workers lifecycle is implemented and there's no other way than to embrace it.

