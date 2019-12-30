---
title: Dealing with opaque responses in Service Worker
image: /articleimgs/phone-taking-photo-selfie.pexels.jpg
tags: [Service Worker, Offline Capabilities]
description: One of the most complex and possibly annoying aspect of the offline mode implementation for Progressive Web Apps is when it needs to deal with cross-origin requests. As Service Worker is intercepting all the HTTP requests originating from our application, it means that also these reaching the external servers are to be handled, and this in turn means we need to deal with Cross-Origin Resource Sharing (CORS).
---

One of the most complex and possibly annoying aspect of the [offline mode](https://whatwebcando.today/offline.html) implementation for Progressive Web Apps is when it needs to deal with cross-origin requests, that is the requests that are issued by our application to the other, external origin. As Service Worker is intercepting all the HTTP requests originating from our application, it means that also these reaching the external servers are to be handled, and this in turn means we need to deal with [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

![Dealing with opaque responses in Service Worker](/articleimgs/phone-taking-photo-selfie.pexels.jpg)

## How is CORS related with Service Worker caching

Cross-Origin Resource Sharing is a safety measure implemented within the browsers to limit the risk of unwanted (potentially insecure or malicious) access to the resources from origins other than whitelisted. We can use it to protect our APIs from being used from clients we don't accept. Unless we whitelist some external domains by adding appropriate response headers in of our APIs, the browser will not allow it to call us from anywhere except our own origin. 

All cross-origin requests are affected by CORS rules, although the handling differs depending on who issued the requests. In case the request was initiated as a part of the markup, for example by `<img src>` attribute pointing to the image on an external server, the restriction is loosened, so that the tag receives the image without any additional server- or client-side CORS configuration, as expected. But it's not all roses – this kind of request in [Fetch API terminology](https://developer.mozilla.org/en-US/docs/Web/API/Request/mode) has its mode set to `no-cors`. This imposes a restriction that the response for this request is not freely available to the app and may only serve to fulfil its original intent – show the image, in our case. For all other uses – like accessing it by code – it's hidden, *opaque* in the spec parlance. 

## How does *opaque response* look like?

From the Service Worker perspective, only the existence of the opaque response is visible. Service Worker has no access to any property of the response – not only to its `body`, but even the status (it appears as `0`, regardless if the request actually ended with `200`, `404` or any other code). This opens up a question how to approach caching these responses in Cache API.

## Option 1: Caching opaque responses

Even though `no-cors` requests cause Service Worker not to have any access to the response content, it still allows us to cache it in Cache API if all we need is to speed up its loading in the future and/or allow serving it offline. We can't use [`cache.add`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/add) method in this case, though, as it only succeeds for responses that are `ok` (their `status` is in 200-399 range), and apparently opaque responses are never seen as `ok`, even if they succeeded (as their `status` is always `0`). We need to add these entries manually using lower-level method:

```
await cache.put(noCorsRequest, opaqueResponse)
```

If we're using [Workbox](https://developers.google.com/web/tools/workbox/) to define our cache strategies, its default behavior excludes caching opaque responses at all. We can [opt-in](https://developers.google.com/web/tools/workbox/guides/handle-third-party-requests) into caching these responses by defining `0` as a valid cacheable response status.

```
workbox.routing.registerRoute(
  'https://example.com/image.png',
  new workbox.strategies.NetworkFirst({
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  }),
);
```

Caching opaque responses is a dangerous thing, though, especially if we're using [Cache Falling Back To Network](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook#cache-falling-back-to-network) caching strategy. We're caching the responses not knowing if they succeeded, so we also cache errors. For any cache-first strategy it would mean that once we cache the erroneous response, we're going to serve this error forever – it doesn't sound wise. For network-first strategies it has more sense, as in the worst case we'll serve the error only until we're able to reach the network again. Anyway, use this option with caution.

## Option 2: Ignoring opaque responses

Is it then better to ignore the opaque responses? This is what Workbox does by default and this is what definitely makes sense for cache-first strategies. What we lose in this case is the ability to serve any result of the cross-origin request in offline mode, which for some apps might be a major downside.

## Option 3: Use full CORS

We can work around the problem of opaque responses by avoiding getting them in the first place. To do so, we need to ensure our requests are issued with `mode` set to `cors`. For the markup-originating resources, we may achieve it by specifying `crossorigin` attribute:

```
<img src="https://example.com/image.png" crossorigin="anonymous" />
```

This way we're instructing the browser to skip the loosened CORS rule for markup requests and perform full CORS validation. But it also means that our external server needs to be ready for CORS - it needs to whitelist our origin to access the image, otherwise we'll be unable to retrieve the image at all. So it's only a viable option if the server is very permissive or it's under our control and definitely not an option if the address is determined dynamically.

## Conclusion

Which strategy to handle opaque responses to use? Unfortunately, it's not possible to have a definite answer, It depends on the app's specifics. Generally, if we are sure the external origin whitelists our origin, we may try going with option #3. Otherwise, decide based on our caching strategy and offline needs. Prefer network-first strategies and cache the opaque response blindly (option #1) or forget about full offline support for cross-origin requests and stay on the safe side of not caching it at all (option #2).

