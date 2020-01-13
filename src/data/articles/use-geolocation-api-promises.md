---
title: How to use Geolocation API with Promises
image: /articleimgs/beige-map.pexels.jpg
tags: [Geolocation]
description: Geolocation API is definitely one of the best known device integration APIs we have on the web, both thanks its usefulness as well as its age. It lets the apps gain access to the user's location, expressed as geo-coordinates and subscribe to its changes. The possible usages range from location-based content filtering through mapping services to city games.
---

[Geolocation API](https://whatwebcando.today/geolocation.html) is definitely one of the best known device integration APIs we have on the web, both thanks its usefulness as well as its age. It lets the apps gain access to the user's location, expressed as geo-coordinates and subscribe to its changes. The possible usages range from location-based content filtering through mapping services to city games.

![How to use Geolocation API with Promises](/articleimgs/beige-map.pexels.jpg)

The first specs were created [around 2008](https://www.w3.org/TR/2008/WD-geolocation-API-20081222/#geolocation_interface) and implemented by the browsers as early as 2009. The support ranges back to Internet Explorer 9 and Safari 5. Most of the API remains unchanged since then, and it can be felt nowadays, as its design even predates [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) – the only way APIs on the Web platform handle asynchronicity these days. Geolocation API uses almost forgotten pattern of callbacks to handle its asynchronicity – so for developers used to Promise chains it might not be obvious how to make it work together with Promise-based APIs.

Fortunately, converting callback-based Geolocation API into Promise-based one requires only a simple wrapper, here in TypeScript version for type safety:

```
function getPosition(options?: PositionOptions): Promise<Position> {
    return new Promise((resolve, reject) => 
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
    );
}
```

Now we can use this version of Geolocation API with Promise chains. Its only parameter is now the optional [`options` parameter](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions), callbacks are replaced by Promise resolved or rejected value:

```
getPosition(options)
  .then((position) => {
    console.log(position);
  })
  .catch((err) => {
    console.error(err.message);
  });
```

It can also be used with `async`/`await`, as it's only a syntactic sugar on top of Promises:

```
try {
    const position = await getPosition(options);
    console.log(position);
} catch (err) {
    console.error(err.message);
}
```

This async block is equivalent to the pure Promise version above.

Apparently, this simple Promise-based wrapper for Geolocation API was also released as at least [several NPM packages](https://www.npmjs.com/search?q=geolocation%20promise), if this is the way you prefer to import the code, although these three lines don't seem to justify adding next dependency to our project.
