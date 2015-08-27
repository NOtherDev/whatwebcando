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

  Feature.containedIn = function (container, property) {
    if (property in container) {
      return true;
    }

    let capitalizedProperty = property.substr(0, 1).toUpperCase() + property.substr(1);
    for (let prefix of ['moz', 'webkit', 'ms']) {
      if (prefix + capitalizedProperty in container) {
        return true;
      }
    }

    return false;
  };

  Feature.navigatorContains = function (property) {
    return Feature.containedIn(navigator, property);
  };
  Feature.windowContains = function (property) {
    return Feature.containedIn(window, property);
  };

  let features = {
    pushNotifications: new Feature({
      id: 'push-notifications',
      icon: 'mdi-notification-tap-and-play',
      name: 'Push notifications',
      supported: Feature.navigatorContains('serviceWorker') && Feature.windowContains('PushManager') && Feature.containedIn(ServiceWorkerRegistration.prototype, 'showNotification'),
      urls: ['https://developers.google.com/web/updates/2015/03/push-notificatons-on-the-open-web']
    }),
    backgroundTasks: new Feature({
      id: 'background-tasks',
      icon: 'mdi-action-settings-applications',
      name: 'Background processing',
      supported: Feature.navigatorContains('serviceWorker'),
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
    }),
    geolocation: new Feature({
      id: 'geolocation',
      icon: 'mdi-device-gps-fixed',
      name: 'Geolocation',
      supported: Modernizr.geolocation
    }),
    bluetooth: new Feature({
      id: 'bluetooth',
      icon: 'mdi-device-bluetooth',
      name: 'Bluetooth',
      supported: Feature.navigatorContains('bluetooth'),
      urls: ['https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web']
    }),
    nfc: new Feature({
      id: 'nfc',
      icon: 'mdi-device-nfc',
      name: 'NFC',
      supported: Feature.navigatorContains('nfc')
    }),
    proximity: new Feature({
      id: 'proximity',
      icon: 'mdi-image-leak-add',
      name: 'Proximity sensors',
      supported: Feature.windowContains('ondeviceproximity')
    }),
    networkInfo: new Feature({
      id: 'network-information',
      icon: 'mdi-device-wifi-tethering',
      name: 'Network information',
      supported: Feature.navigatorContains('connection')
    }),
    online: new Feature({
      id: 'online-state',
      icon: 'mdi-device-signal-cellular-connected-no-internet-3-bar',
      name: 'On-line state',
      supported: Feature.navigatorContains('onLine')
    }),
    mediaCapture: new Feature({
      id: 'media-capture',
      icon: 'mdi-image-camera-alt',
      name: 'Media capturing',
      supported: Feature.navigatorContains('getUserMedia'),
      urls: ['http://www.html5rocks.com/en/tutorials/getusermedia/intro/']
    }),
    wakeLock: new Feature({
      id: 'wake-lock',
      icon: 'mdi-action-lock',
      name: 'Wake lock',
      supported: Feature.navigatorContains('requestWakeLock')
    })
  };

  let featuresGroups = [
    {
      heading: 'Behave like a native app',
      features: [features.pushNotifications, features.backgroundTasks, features.touch, features.manifest]
    },
    {
      heading: 'Access what\'s around',
      features: [features.geolocation, features.networkInfo, features.online, features.bluetooth, features.nfc, features.proximity]
    },
    {
      heading: 'Access device features',
      features: [features.mediaCapture, features.wakeLock]
    }
  ];

  WWCD.container.configure(register => register.singletons({
    features: features,
    featuresGroups: featuresGroups
  }));

})(window.WWCD = (window.WWCD || {}));
