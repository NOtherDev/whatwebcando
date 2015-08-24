// jshint devel:true

(function (WWCD) {
  'use strict';

  class Feature {
    constructor({ id, name, supported = undefined, icon = undefined, urls = []}) {
      this.id = id;
      this.name = name;
      this.supported = supported;
      this.icon = icon;
      this.urls = urls;
    }

    get notSupported() {
      return this.supported === false;
    }
  }

  let features = {
    notifications: new Feature({
      id: 'notifications',
      icon: 'mdi-notification-tap-and-play',
      name: 'Push notifications',
      supported: 'serviceWorker' in navigator,
      urls: ['http://www.html5rocks.com/en/tutorials/service-worker/introduction/']
    }),
    touch: new Feature({
      id: 'touch',
      icon: 'mdi-content-gesture',
      name: 'Touch gestures',
      supported: Modernizr.touch,
      urls: ['http://www.html5rocks.com/en/mobile/touch/']
    }),
    manifest: new Feature({
      id: 'manifest',
      icon: 'mdi-content-archive',
      name: 'Standalone apperance & offline capabilities',
      url: ['https://developers.google.com/web/updates/2014/11/Support-for-installable-web-apps-with-webapp-manifest-in-chrome-38-for-Android', 'http://html5doctor.com/web-manifest-specification/']
    })
  };

  let featuresGroups = [
    {
      heading: 'Behave like an app',
      features: [features.notifications, features.touch, features.manifest]
    },
    {
      heading: 'second',
      features: [
        new Feature({
          id: 'lklj',
          name: 'lkjlkj!',
          supported: false
        }),
        new Feature({
          id: 'oipoi',
          name: 'poipoi!',
          supported: true
        })
      ]
    }
  ];

  WWCD.container.configure(register => register.singletons({
    features: features,
    featuresGroups: featuresGroups
  }));

})(window.WWCD = (window.WWCD || {}));
