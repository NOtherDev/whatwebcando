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

  let capitalizeFirst = str => str.substr(0, 1).toUpperCase() + str.substr(1);

  Feature.containedIn = function (container, property) {
    if (property in container) {
      return true;
    }

    let capitalizedProperty = capitalizeFirst(property);
    for (let prefix of ['moz', 'webkit', 'ms']) {
      if (prefix + property in container || prefix + capitalizedProperty in container) {
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
      supported: Feature.windowContains('ontouchstart'),
      urls: ['http://www.html5rocks.com/en/mobile/touch/']
    }),
    manifest: new Feature({
      id: 'manifest',
      icon: 'mdi-content-archive',
      name: 'Homescreen installation',
      url: ['https://developers.google.com/web/updates/2014/11/Support-for-installable-web-apps-with-webapp-manifest-in-chrome-38-for-Android', 'http://html5doctor.com/web-manifest-specification/']
    }),
    foregroundDetection: new Feature({
      id: 'foreground-detection',
      icon: 'mdi-action-flip-to-front',
      name: 'Foreground detection',
      supported: Feature.containedIn(document, 'visibilityState')
    }),
    geolocation: new Feature({
      id: 'geolocation',
      icon: 'mdi-device-gps-fixed',
      name: 'Geolocation',
      supported: Feature.navigatorContains('geolocation')
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
    }),
    vibration: new Feature({
      id: 'vibration',
      icon: 'mdi-notification-vibration',
      name: 'Vibration',
      supported: Feature.navigatorContains('vibrate')
    }),
    accelerometer: new Feature({
      id: 'accelerometer',
      icon: 'mdi-action-3d-rotation',
      name: 'Accelerometer',
      supported: Feature.windowContains('DeviceMotionEvent'),
      urls: ['http://www.html5rocks.com/en/tutorials/device/orientation/']
    }),
    batteryStatus: new Feature({
      id: 'battery-status',
      icon: 'mdi-device-battery-80',
      name: 'Battery status',
      supported: Feature.navigatorContains('getBattery')
    }),
    ambientLight: new Feature({
      id: 'ambient-light',
      icon: 'mdi-device-brightness-low',
      name: 'Ambient light',
      supported: Feature.windowContains('ondevicelight'),
      urls: ['http://modernweb.com/2014/05/27/introduction-to-the-ambient-light-api/']
    }),
    permissions: new Feature({
      id: 'permissions',
      icon: 'mdi-action-lock-open',
      name: 'Permissions',
      supported: Feature.navigatorContains('permissions'),
      urls: ['https://developers.google.com/web/updates/2015/04/permissions-api-for-the-web']
    }),
    files: new Feature({
      id: 'files',
      icon: 'mdi-device-sd-storage',
      name: 'File access',
      supported: Feature.windowContains('File'),
      urls: ['http://www.html5rocks.com/en/tutorials/file/dndfiles/']
    }),
    storage: new Feature({
      id: 'storage',
      icon: 'mdi-notification-folder-special',
      name: 'Offline storage',
      supported: Feature.windowContains('indexedDB') || Feature.windowContains('localStorage')
    }),
    contacts: new Feature({
      id: 'contacts',
      icon: 'mdi-action-account-box',
      name: 'Contacts',
      supported: Feature.navigatorContains('contacts')
    }),
    quota: new Feature({
      id: 'quota',
      icon: 'mdi-notification-sim-card-alert',
      name: 'Quota management',
      supported: Feature.windowContains('storageInfo') || Feature.navigatorContains('temporaryStorageQuota'),
      urls: ['http://www.html5rocks.com/en/tutorials/offline/quota-research/']
    }),
    deviceOrientation: new Feature({
      id: 'device-orientation',
      icon: 'mdi-device-screen-rotation',
      name: 'Device orientation',
      supported: Feature.windowContains('DeviceOrientationEvent'),
      urls: ['http://www.html5rocks.com/en/tutorials/device/orientation/']
    }),
    rotationLock: new Feature({
      id: 'rotation-lock',
      icon: 'mdi-device-screen-lock-rotation',
      name: 'Rotation lock',
      supported: Feature.containedIn(window.screen, 'lockOrientation')
    }),
    presentation: new Feature({
      id: 'presentation',
      icon: 'mdi-hardware-tv',
      name: 'Presentation features',
      supported: Feature.navigatorContains('presentation')
    }),
    viewports: new Feature({
      id: 'viewports',
      icon: 'mdi-hardware-phonelink',
      name: 'Viewport adaptation',
      urls: ['https://dev.opera.com/articles/an-introduction-to-meta-viewport-and-viewport/']
    })
  };

  let featuresGroups = [
    {
      heading: 'Behave like a native app',
      features: [features.pushNotifications, features.backgroundTasks, features.touch, features.manifest, features.foregroundDetection]
    },
    {
      heading: 'Access what\'s around',
      features: [features.geolocation, features.bluetooth, features.nfc, features.proximity, features.ambientLight]
    },
    {
      heading: 'Access device features',
      features: [features.mediaCapture, features.networkInfo, features.online, features.vibration, features.batteryStatus]
    },
    {
      heading: 'Access the system',
      features: [features.storage, features.files, features.permissions, features.contacts, features.quota]
    },
    {
      heading: 'Control screen & output',
      features: [features.deviceOrientation, features.rotationLock, features.wakeLock, features.viewports, features.presentation]
    }
  ];

  WWCD.container.configure(register => register.singletons({
    features: features,
    featuresGroups: featuresGroups
  }));

})(window.WWCD = (window.WWCD || {}));
