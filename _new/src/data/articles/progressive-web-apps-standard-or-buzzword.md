---
title: Progressive Web Apps – standard or buzzword?
image: /articleimgs/adult-books-business-coffee.pexels.jpg
tags: [PWA, Service Worker]
description: Progressive Web Apps (PWA) is modern way to build applications, including mobile ones, using purely web technologies and relying purely on the capabilities and strengths the Web platform. Historically, it was the lack of these capabilities on the Web that caused the boom of the mobile apps, using so-called "native" (platform-specific) development approaches.
---

Progressive Web Apps (PWA) is modern way to build applications, including mobile ones, using purely web technologies and relying purely on the capabilities and strengths the Web platform. Historically, it was the lack of these capabilities on the Web that caused the boom of the mobile apps, using so-called "native" (platform-specific) development approaches. 

The time has passed and the Web is now fighting back with the new, strong capabilities, in many cases not worse than what the native platforms can offer. And now, there's a growing trend of considering Progressive Web Apps as a viable strategy for the mobile presence for many brands.

However, still, there also seems to exist a decent misunderstanding about what PWA term really constitutes, what does it mean for the application to become one and what changes in terms of the Web Platform's building blocks. The fact that PWA term was never officially defined by any authority does not help clearing out this unclearness. Let's try to sum up the facts on our own.

## Fact 1 - PWA is only a buzzword

![Some Title](/articleimgs/adult-books-business-coffee.pexels.jpg)

Progressive Web Apps as a term was [coined in 2015](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/) by [Frances Berriman](https://fberriman.com/about/) and [Alex Russell](https://twitter.com/slightlylate) as the name for the new class of experiences utilizing the Web Platform in the new ways, allowing it to serve as the only technology required to achieve the native look-and-feel on mobile. It was rather a loose idea, and actually it stayed to be such. Even though most of the browser vendors use the PWA term in the developer-facing communication, no standard definition exists and no standard definition will probably exist in the future. 

Progressive Web Apps is mostly the marketing term to cover the idea that most of the applications do not have any real reason to be implemented and packaged as native apps. Nowadays, the capabilities of the Web platform include [home screen installability](https://whatwebcando.today/installation.html), [offline capabilities](https://whatwebcando.today/offline.html) and the wide range of features and OS-level integrations that used to be available only for platform-specific development. Apart from this, with Web-first approach, the app owners might benefit from what the Web had always offered as its core functionalities - lack of troublesome and centralized distribution model via app stores and the ability to share it via the simplest and most well-known mechanism - links.

## Fact 2 - PWA does not revolutionize the web development

Progressive Web Apps are still "just" the web applications. The term itself emphasise it well enough. Apps are things that the non tech-savvy people tap on their home screens and "just use it". Thus, Web Apps are these that use the Web as the technology of choice - but there's nothing for the end user to care about. The key is in "Progressive" part - these apps take advantage of as much app-specific features as they need and as many as there are available on the current device. Some apps might only need [push notifications](https://whatwebcando.today/push-notifications.html), others might only need [offline access](https://whatwebcando.today/offline.html). And some might not necessarily need any of these but might benefit from them as an additional non-crucial features when they are available.

Every existing application might be called a PWA if it takes advantage of the Web Platform capabilities in a way that makes it look and feel like native for the average mobile user. There's no need to migrate to the new technologies or to rewrite any fundamental parts of the average application to make it a good candidate to be called a "real PWA". All the principles of the web still hold true regardless how much PWA-ness we introduce to our apps.

## Fact 3 - There are only three must-have traits for PWA

This kind of [progressive enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement) approach, together with the lack of proper standard for PWA, raises a question what does it take for the "normal" web application to become a "proper" PWA. There can't be a single correct answer here, but there are three parts of the store that are crucial for the app to adhere to to consider it a PWA:

1. **[Service Worker](https://w3c.github.io/ServiceWorker/) existence**. Service Worker is a piece of JavaScript code that runs outside the tabs and is an enabler for the broad range of app-like features like offline capabilities, background synchronization or push notifications. Without Service Worker handling the network unavailability case, the app is unable to provide any experience in such case and this is definitely not what the users are used to on mobile devices.
2. **HTTPS certificate**. Service Workers, as the extremely powerful feature, are specified to be only available for the websites that are loaded with proper security and privacy - namely HTTPS certificate. It becomes a requirement for the PWA, thus. The basic certificates are provided for free by many vendors, including [Amazon Web Services](https://hackernoon.com/getting-a-free-ssl-certificate-on-aws-a-how-to-guide-6ef29e576d22) and [Let's Encrypt](https://letsencrypt.org/), so there should be no financial reason not to have it. Also, for the development convenience, HTTPS is not required when running our application from localhost environment.
3. **[Web App Manifest](https://www.w3.org/TR/appmanifest/)** file. To achieve the most visible native app trait for our web application, we need to provide some metadata, like the app's name and icon, through the standardized JSON file. It is then read by the client's browser and used to provide the UI allowing them to "install" the icon on the home screen. The manifest is also a way to let the system know how much of the browser's UI to show (via `display` property) and which part of our origin (address space) should be treated by the system as belonging to our PWA (via `scope` property).

## Fact 4 - Chrome uses Lighthouse to run more checks

These three traits are the basis. It's a de-facto standard to go further and rely on what the biggest player in the market thinks about what it takes to develop a PWA - namely Google Chrome and their [Lighthouse](https://developers.google.com/web/tools/lighthouse) - an automated audit tool for the web. The tool checks for the existence of particular traits of the application to give it a PWA badge. There are [numerous checks](https://developers.google.com/web/progressive-web-apps/checklist) within "Progressive Web App" audit category, most of them are actually testable in an automated manner.

Apart for the general offline availability and installability, Chrome puts focus on performance bits. The application that fails to provide a fast response doesn't get the Lighthouse's PWA badge. It is also important for the apps that we want to package as [Trusted Web Activity](https://blog.chromium.org/2019/02/introducing-trusted-web-activity-for.html) and publish in the Google Play Store - there is a hard requirement for the apps to receive at least 80 points in the Lighthouse's Performance section to be allowed in Google Play.

## \*\*

Progressive Web App term can probably be considered a short-term buzzword that is going to be obsolete when the practices and technologies that now constitute it became the de-facto standards and every website will take advantage of it, at least partially. This is what happened with terms like [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)) or [Web 2.0](https://en.wikipedia.org/wiki/Web_2.0) that became extinct after their offerings became the obvious part of the web development. Likewise, this is happening with [responsive web design](https://en.wikipedia.org/wiki/Responsive_web_design) term that with the mobile traffic growth mostly becomes synonymous with just "web design". 

Progressive Web Apps are still rather new concept and until it becomes a norm for the applications to include the offline capabilities and to expect web applications to be installable on the home screen, we need the separate marketing term to promote these ideas. After this happens, it will be obvious to expect from the Web applications to behave as the mobile user expects and we'll be able to refer to PWAs just as "web apps". Or even just "apps", as for the end user it doesn't really matter what kind of technology is there under the hood, as long as the app does its job well, and this is definitely possible on the Web today.
