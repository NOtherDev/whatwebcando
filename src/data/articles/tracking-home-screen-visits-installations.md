---
title: Tracking home screen visits and installations
image: /articleimgs/black-tablet-computer.pexels.jpg
tags: [PWA, Home Screen Installability]
description: Analytics is the key non-functional feature our applications need to have nowadays. It's the hard numbers that should have the decisive voice whenever it must be chosen whether a feature, design or idea is worth exploring. With new Web APIs and the rise of the Progressive Web Applications, there are new aspects we should keep track of and possibly use as an axis of our analysis.
---

Analytics is the key non-functional feature our applications need to have nowadays. It's the hard numbers that should have the decisive voice whenever it must be chosen whether a feature, design or idea is worth exploring. With new Web APIs and the rise of the Progressive Web Applications, there are new aspects we should keep track of and possibly use as an axis of our analysis.

## Visits from installed app

![Tracking home screen visits and installations](/articleimgs/black-tablet-computer.pexels.jpg)

Thanks to the [Home Screen Installability](https://whatwebcando.today/installation.html), we have a new way our users might land in our app, besides traditional search results, external links, social shares or direct visits by entering the URL into the browser's address bar – via the OS-level home screen icon (or whatever is the mean given operating system lists the installed applications). 

Ignoring this new distinct source of traffic, we end up mixing it together with direct visits, as no referrer information is available for this kind of requests. Fortunately, [Web App Manifest standard](https://www.w3.org/TR/appmanifest/#start_url-member) gives us a handy way to draw the line between these sources with the `start_url` property. It is designed to specify at which page should we start our app when opened as the system-installed app, i.e. from the home screen icon. Its value should be set to an URL – either absolute or relative to the Manifest location, with latter making it easier to share between the environments. It needs to be contained within the [Web Manifest's scope](https://www.w3.org/TR/appmanifest/#scope-member), but not necessarily be equal to the URL from which the user linked to the Manifest. 

```
{
    "start_url": "/"
}
```

Usually we use it to direct those loyal users to the home page, or maybe some kind of specific landing page. But nothing stops us from adding the tracking-specific query parameters there, for example `/?source=homescreen`. This way the URL remembered by the operating system as a starting point of the installed application will include the `source` parameter that wouldn't normally be set by any other traffic source. It might be consumed by our application however we please, including sending it to our analytics tool. Specifically, for Google Analytics, we might include it directly as the [`utm_source` parameter](https://en.wikipedia.org/wiki/UTM_parameters) that will be consumed by Google Analytics out-of-the-box:

```
{
    "start_url": "/?utm_source=homescreen"
}
```

This way `homescreen` will automatically be listed as an acquisition source for the traffic incoming from the installed app and available in Google Analytics "Source / Medium" report:

<figure>
  <img src="/articleimgs/tracking-hs-visits-installs.png" alt="'Homescreen' listed as an acquisition source for the traffic incoming from the installed app and available in Google Analytics 'Source / Medium' report" width="240" />
  <figcaption>"Homescreen" listed as an acquisition source for the traffic incoming from the installed app and available in Google Analytics "Source / Medium" report</figcaption>
</figure>

## Install prompts success rate

Tracking the rate of installs would also be helpful to determine the success rate of the ["add to home screen" prompts](https://developers.google.com/web/fundamentals/app-install-banners#show_the_prompt). This issue is harder, though, because browsers vary in what kind of UI they offer to trigger the installation. As of the end of 2019, all browsers but Chrome on Android only present a small icon in the address bar or the other part of the browser's UI that, when tapped, invokes the system-level installation prompt. Neither the button tap nor its outcome can be tracked at the app level, because these are the parts of the browser UI, not available for the app code.

We might track the prompts in Chrome on Android, though, thanks to how this browser notifies the app when it's about to show the "add to home screen" prompt. Chrome fires `beforeinstallprompt` event to the `window` object and we might use it to replace the native prompt with our custom UI, where it's our code that decides how to present the UI and it's us who triggers the actual system-level prompt when the user intends to install the app. This code lets us to record the custom analytics events on every step of this process - prompt eligibility, actual prompt presentation and its outcome. This is presented in this pseudocode:

```
window.addEventListener('beforeinstallprompt', (event) => {
    // the event was fired, so Chrome allows us to show the custom installation UI now; let's track this fact and show it
    Analytics.trackEvent('eligible for prompt'); 
    showCustomUI()

    // when the user clicks the button within our custom UI, we track this event and present the actual system-level prompt
    customButton.addEventListener('click', () => {
        Analytics.trackEvent('prompt shown')
        const result = event.prompt()

        // additionally, we wait for the prompt's outcome (either "accepted" or "dismissed") and also record it as Analytics event
        event.userChoice
            .then((choice) => Analytics.trackEvent(`prompt ${choice.outcome}`))
    })
})

```

By replacing `Analytics.trackEvent` with the appropriate API call or SDK invocation for our Analytics service, we get the data fed into our reports. For Google Analytics, that would mean calling [`ga('send', 'event', category, event, label, value)` method](https://developers.google.com/analytics/devguides/collection/analyticsjs/sending-hits) and expecting these numbers to show up in the Events report.
