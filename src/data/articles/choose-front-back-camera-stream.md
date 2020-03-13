---
title: How to choose between front and back camera stream
image: /articleimgs/black-camera-mounted-on-tripod.pexels.jpg
tags: [Media Capture API, Camera & Microphone]
description: Most of the browsers nowadays, including mobile browsers, allow the applications to retrieve and use the data stream coming directly from the user's device camera. But it's very common for the devices nowadays to have more than one camera available and we might have a preference which of these cameras is better suited for our app's needs. Fortunately, the Media Stream API has us covered.
---

[Most of the browsers nowadays](https://caniuse.com/#feat=stream), including mobile browsers, allow the applications to retrieve and use the data stream coming directly from the user's device camera. But it's very common for the devices nowadays to have more than one camera available and we might have a preference which of these cameras is better suited for our app's needs. Fortunately, the [Media Stream API](https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API) has us covered.

## Media Stream API

Let's first remind ourselves how do we access the video stream from the user's camera at all. The API sits in `navigator.mediaDevices` and is generic in terms of what kind of media stream it serves. We must specify. that we're particularly interested in video stream. This selects the proper device as well as displays the informative permission prompt for the user. If we requested video only, the browser will ask for a camera access. If we also wants audio, the prompt will include both camera and microphone.

<figure>
  <img src="/articleimgs/camera-permissions.png" alt="Chrome's permissions dialog for video and audio stream" />
  <figcaption>Chrome's permissions dialog for video and audio stream</figcaption>
</figure>

```
const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
})
````

The API is asynchronous – we'll get the stream when the user accepts the prompt and the browser finds the proper devices. If any of these fail, our Promise will get rejected.

In case we successfully acquired the stream, we can start manipulating it. The simplest thing we can do with it is to redirect it to a `<video>` element. In most cases, the `<video>` element has its source specified as a static file, but it also can have any stream as its source – including the one we get from the user's device. We need to attach it programatically:

```
const video = document.querySelector('video');
video.srcObject = stream;
video.play();
```

Now, our `<video>` element will transmit the stream from the camera. So if the front camera is in use it will act as a mirror. But how do we ensure the proper one is used?

## Selecting facing mode of the video stream

When we were acquiring the stream, we passed an object as a `getUserMedia` parameter. This object is a stream constraint definition. We only constrained the stream to include video (and audio) so far. But we can apply tighter constraint:

```
const stream = await navigator.mediaDevices.getUserMedia({
    video: {
        facingMode: 'user'
    }
})
```

Here, we put an object including `facingMode` property as a video constraint, instead of simple `true` that accepted any kind of video input. With constraint, we suggest the browser for what kind of video stream it should look for. In the example, we set it to `user`-facing camera – a.k.a. selfie camera, or the front one. Alternatively, we can specify we want to face `environment`, which is what is observed by the back camera.

The constraint set this way only works as a suggestion, though – in case we run this code on a device equipped with back camera only, we'd get the environment-facing stream anyway, as it's the only one available and it's still better to use whatever we have available instead of failing in most scenarios. But if our requirement is strict and we need to use the front camera or no camera, we can set an additional constraint using `exact`:

```
const stream = await navigator.mediaDevices.getUserMedia({
    video: {
        facingMode: {
            exact: 'user'
        }
    }
})
```

Now, if the device only has an environment-facing camera, we'd not get any stream and the Promise will be rejected with `OverconstrainedError`.

## More constraints

Facing mode is not the only constraint specified by the Media Stream API. We may see the full list of constraint options using `navigator.mediaDevices.getSupportedConstraints()` call. And this list might be quite impressive. This is what Chrome 80 on macOS lists as available:

```
{
    aspectRatio: true
    autoGainControl: true
    brightness: true
    channelCount: true
    colorTemperature: true
    contrast: true
    deviceId: true
    echoCancellation: true
    exposureCompensation: true
    exposureMode: true
    exposureTime: true
    facingMode: true
    focusDistance: true
    focusMode: true
    frameRate: true
    groupId: true
    height: true
    iso: true
    latency: true
    noiseSuppression: true
    pointsOfInterest: true
    resizeMode: true
    sampleRate: true
    sampleSize: true
    saturation: true
    sharpness: true
    torch: true
    whiteBalanceMode: true
    width: true
    zoom: true
    videoKind: true
    pan: true
    tilt: true
}
```

Obviously, some of these constraint only make sense for audio and others for video streams.

The ones that might also be frequently used are these related with video resolution:

```
const stream = await navigator.mediaDevices.getUserMedia({
    video: {
        width: 1280,
        height: 720
    }
})
```

Note that like with `facingMode`, by default this is only a suggestion for what kind of stream we are looking for and the browser might as well provide the one with different size. We might again use `exact` modifier to ask for exactly the size specified, but in case of resolution it's probably wiser to specify the minimum size we accept, using `min` modifier:

```
const stream = await navigator.mediaDevices.getUserMedia({
    video: {
        width: {
            min: 1280
        },
        height: {
            min: 720
        }
    }
})
```

The browser now will not provide a stream if it's not possible to find one with at least 1280x720 size.

## Selecting both size and facing mode

As the constraint is an object, nothing stops us from specifying more requirements, possibly with different modifiers. The browser will try to match as many as possible when providing the stream and in case we used `exact` or `min` modifiers that can't be satisfied, it will again reject the promise with `OverconstrainedError`.

```
const stream = await navigator.mediaDevices.getUserMedia({
    video: {
        facingMode: 'environment',
        width: {
            min: 1280
        },
        height: {
            min: 720
        }
    }
})
```

In this example, we're asking for the stream that should face the environment (back camera) when possible, but we also accept if only the front camera is available. For size we do not accept the sizes smaller than 1280 in width or 720 in height.
