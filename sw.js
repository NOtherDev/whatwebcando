const VERSION = 'c2049dc'; const groups = [
  {
    "heading": "Native Behaviors",
    "features": [
      {
        "id": "local-notifications",
        "icon": "mdi-notification-system-update",
        "name": "Local Notifications"
      },
      {
        "id": "push-notifications",
        "icon": "mdi-notification-tap-and-play",
        "name": "Push Messages"
      },
      {
        "id": "installation",
        "icon": "mdi-action-get-app",
        "name": "Home Screen Installation"
      },
      {
        "id": "foreground-detection",
        "icon": "mdi-action-flip-to-front",
        "name": "Foreground Detection"
      },
      {
        "id": "permissions",
        "icon": "mdi-action-lock-open",
        "name": "Permissions"
      }
    ]
  },
  {
    "heading": "Surroundings",
    "features": [
      {
        "id": "bluetooth",
        "icon": "mdi-device-bluetooth",
        "name": "Bluetooth"
      },
      {
        "id": "nfc",
        "icon": "mdi-device-nfc",
        "name": "NFC"
      },
      {
        "id": "proximity",
        "icon": "mdi-image-leak-add",
        "name": "Proximity Sensors"
      },
      {
        "id": "ambient-light",
        "icon": "mdi-device-brightness-low",
        "name": "Ambient Light"
      }
    ]
  },
  {
    "heading": "Device Features",
    "features": [
      {
        "id": "network-type-speed",
        "icon": "mdi-device-wifi-tethering",
        "name": "Network Type & Speed"
      },
      {
        "id": "online-state",
        "icon": "mdi-device-signal-cellular-connected-no-internet-3-bar",
        "name": "Online State"
      },
      {
        "id": "vibration",
        "icon": "mdi-notification-vibration",
        "name": "Vibration"
      },
      {
        "id": "battery-status",
        "icon": "mdi-device-battery-80",
        "name": "Battery Status"
      }
    ]
  },
  {
    "heading": "Camera & Microphone",
    "features": [
      {
        "id": "camera-microphone",
        "icon": "mdi-image-camera-alt",
        "name": "Audio & Video Capture"
      },
      {
        "id": "photos",
        "icon": "mdi-image-camera-roll",
        "name": "Advanced Camera Controls"
      },
      {
        "id": "recording",
        "icon": "mdi-av-mic",
        "name": "Recording Media"
      },
      {
        "id": "realtime",
        "icon": "mdi-av-videocam",
        "name": "Real-time Communication"
      }
    ]
  },
  {
    "heading": "Screen & Output",
    "features": [
      {
        "id": "fullscreen",
        "icon": "mdi-action-settings-overscan",
        "name": "Fullscreen"
      },
      {
        "id": "orientation-lock",
        "icon": "mdi-device-screen-lock-rotation",
        "name": "Screen Orientation & Lock"
      },
      {
        "id": "wake-lock",
        "icon": "mdi-action-lock",
        "name": "Wake Lock"
      },
      {
        "id": "presentation",
        "icon": "mdi-hardware-tv",
        "name": "Presentation Features"
      }
    ]
  },
  {
    "heading": "Input",
    "features": [
      {
        "id": "touch",
        "icon": "mdi-content-gesture",
        "name": "Touch Gestures"
      },
      {
        "id": "speech-recognition",
        "icon": "mdi-av-mic",
        "name": "Speech Recognition"
      },
      {
        "id": "clipboard",
        "icon": "mdi-content-content-paste",
        "name": "Clipboard (Copy & Paste)"
      },
      {
        "id": "pointer-adaptation",
        "icon": "mdi-hardware-mouse",
        "name": "Pointing Device Adaptation"
      }
    ]
  },
  {
    "heading": "Seamless Experience",
    "features": [
      {
        "id": "offline",
        "icon": "mdi-action-settings-applications",
        "name": "Offline Mode"
      },
      {
        "id": "background-sync",
        "icon": "mdi-action-backup",
        "name": "Background Sync"
      },
      {
        "id": "app-communication",
        "icon": "mdi-action-explore",
        "name": "Inter-App Communication"
      },
      {
        "id": "payments",
        "icon": "mdi-action-payment",
        "name": "Payments"
      },
      {
        "id": "credentials",
        "icon": "mdi-action-lock-open",
        "name": "Credentials"
      }
    ]
  },
  {
    "heading": "Location & Position",
    "features": [
      {
        "id": "geolocation",
        "icon": "mdi-device-gps-fixed",
        "name": "Geolocation"
      },
      {
        "id": "geofencing",
        "icon": "mdi-action-group-work",
        "name": "Geofencing"
      },
      {
        "id": "device-orientation",
        "icon": "mdi-device-screen-rotation",
        "name": "Device Orientation"
      },
      {
        "id": "accelerometer",
        "icon": "mdi-action-3d-rotation",
        "name": "Device Motions"
      }
    ]
  },
  {
    "heading": "Operating System",
    "features": [
      {
        "id": "storage",
        "icon": "mdi-notification-folder-special",
        "name": "Offline Storage"
      },
      {
        "id": "files",
        "icon": "mdi-device-sd-storage",
        "name": "File Access"
      },
      {
        "id": "contacts",
        "icon": "mdi-action-account-box",
        "name": "Contacts"
      },
      {
        "id": "storage-quota",
        "icon": "mdi-notification-sim-card-alert",
        "name": "Storage Quotas"
      }
    ]
  }
]
;
this.addEventListener('install', function (event) {
  self.skipWaiting();

  event.waitUntil(
    caches.open(VERSION).then(function (cache) {
      let files = [
        '/',
        '/index.html',
        '/scripts/main.e1cf4531.js',
        '/scripts/vendor.65ca8f8f.js',
        '/styles/main.0570461b.css',
        '/styles/layout.f59b7c5f.css',
        '/styles/vendor.f0c6d102.css',
        '/images/logo.svg',
        '/fonts/Material-Design-Icons.woff',
        'https://fonts.gstatic.com/s/lato/v13/MDadn8DQ_3oT6kvnUq_2r_esZW2xOQ-xsNqO47m55DA.woff2',
        'https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.23.0/polyfill.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/chartist/0.9.8/chartist.min.js'
      ];

      groups.forEach(function (group) {
        group.features.forEach(function (feature) {
          files.push(`/${feature.id}.html`);
        });
      });

      return cache.addAll(files);
    })
  );
});

this.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== VERSION) {
          return caches.delete(key);
        }
      }));
    })
  );
});

const isCacheable = request => request.mode === 'navigate' || request.url.indexOf('https://raw.githubusercontent.com') === 0;

this.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open(VERSION)
      .then(function (cache) {
        // cache first, fallback to network
        return cache.match(event.request, {ignoreSearch: true})
          .then(function (response) {
            if (response) {
              return response;
            }

            return fetch(event.request)
              .then(function (fetchResponse) {
                // cache already fetched data
                if (fetchResponse && fetchResponse.status === 200 && isCacheable(event.request)) {
                  cache.put(event.request, fetchResponse.clone());
                }
                return fetchResponse;
              });
          });
      })
  );
});
