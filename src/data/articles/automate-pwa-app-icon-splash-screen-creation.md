---
title: How to automate PWA App Icon and Splash Screen Creation
image: /articleimgs/loading-splash.pexels.jpg
tags: [PWA, Home Screen Installability]
description: To create a native-like experience, Web applications have to meet the criteria of the intended PWA platforms and stores, including all splash screens, icon sizes and assets. According to a number of different sources, in order to cover all sizes and platforms, approximately 100 images might be needed.
weight: 2
author: '[Maksym Shekhovets](https://softwareplanetgroup.co.uk)'
---

Today, Web applications can reach anyone anywhere, on any device and with a single codebase. Progressive Web Applications (PWAs) in particular are built and enhanced with modern APIs to deliver improved capabilities, reliability, and – crucially – [installability](/installation.html).

## Splash Screen Requirements (Android, iOS, Microsoft Store)

When your application first launches, it can sometimes take a few seconds to power up and for the initial content to begin to render. When this happens, instead of displaying a white screen that may signal that the application has stalled, the browser will typically show a splash screen until the main screen becomes available to the user. In order to do this, the required information is taken from `manifest.json` and `index.html` files that must contain a declaration of all icons, images, and of course, of the splash screen itself.

However, to create a [native-like experience](https://softwareplanetgroup.co.uk/native-vs-html5-vs-react-natve-apps-who-wins-updated/), you will also have to meet the criteria of your intended PWA platforms and stores: this includes all splash screens, icon sizes and assets.

## Materials

According to a number of different sources, in order to cover all sizes and platforms, you’ll need approximately 100 images. Thankfully, Chrome can automatically create a splash screen from your manifest properties, to be specific:
- `name`
- `background_color`
- `icons`

Note that your `background_color` should be the same color as the initial load page, as this provides a smooth transition from the splash screen to your application. Chrome (mostly for Chromebook and ChromeOS) will also select the icon that is the best match for the device’s resolution. While providing 192px and 512px icons will be sufficient in the vast majority of cases, you can provide additional icons to achieve pixel perfection.

For iOS, things are more or less straightforward, as we can get all of their screen sizes from the [official design guide](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/adaptivity-and-layout/#device-screen-sizes-and-orientations). 

In Android’s case, unfortunately, there are currently no official guidelines, as there are many more smartphones to deal with, with equally varying resolutions and sizes. If it helps, however, maybe you should look to the market leaders, like Google Pixel, Samsung S20, Huawei P40, OnePlus and others.

And finally, publishing your app to the Microsoft Store will mean that it can also be launched on the desktop, so how to deal with all the ensuing screen sizes?

## Publishing PWAs to Major App Stores

Well, as noted in Microsoft’s [official documentation](https://docs.microsoft.com/en-us/microsoft-edge/progressive-web-apps/get-started#web-app-manifest), in order to be automatically packaged for the Microsoft Store, your PWA will be expected to meet specific image criteria that must also be declared in your Web App Manifest.

When it comes to the Android platform, Google follows Web App Manifest API specifications, and expects you to provide at least 2 icon sizes in your manifest file — see [docs for more information](https://developers.google.com/web/fundamentals/web-app-manifest/#icons).

As for Apple, things are a little bit different, but in general you can find your bearings using the [aforementioned official guide](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/adaptivity-and-layout/#device-screen-sizes-and-orientations).

## Tools to create your PWA splash screen

These tools may be divided into two separate categories - manual and automatic.

In the manual group, we can list GIMP, Photoshop and a number of Paint-like editors. You and your designers must work carefully to respect all platforms’ individual requirements and maintain the required quality level across the board. Next, your developers should add the assets to the application before building it and testing assets from within the app. But what then if you needed to change something? Well, unfortunately, you would have to repeat the above steps once again. Maybe not all of them, to be fair, but you’d still have plenty of work to do :).

But wait, are there any alternatives? Indeed there are, my friend. Let’s talk about automation! 
Being a developer, I have always wanted to automate splash screens as a part of the development cycle, and I recently discovered just how to do this.

[PWA Asset Generator](https://www.npmjs.com/package/pwa-asset-generator) is an open-source CLI tool that automatically generates icon and splash screen images. It does so by following Web App Manifest specifications in addition to Apple Human Interface guidelines. Even better, however, it can even update manifest.json and index.html files with the generated images. There's a [step-by-step guide](https://itnext.io/pwa-splash-screen-and-icon-generator-a74ebb8a130) on exactly how to do this. Be aware, though, that this article was published in 2019, so there may actually be a more recent technique.

Lastly, if you would like some help with app icons, then have a look at [MakeAppIcon](https://makeappicon.com/), and if you require any additional tools, you may also find [PWA Builder](https://www.pwabuilder.com/imageGenerator) useful.

## Summary

Irrespective of the application, dealing with assets is a difficult process, but automation can greatly simplify your life. More importantly, the same can be said for knowing the requirements of different platforms in addition to where your PWA will be utilized.
