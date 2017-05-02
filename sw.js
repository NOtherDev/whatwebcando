const VERSION = '96e34bd'; const groups = [
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
    "heading": "Seamless Experience",
    "features": [
      {
        "id": "offline",
        "icon": "mdi-action-settings-applications",
        "name": "Offline Mode"
      },
      {
        "id": "installation",
        "icon": "mdi-action-get-app",
        "name": "Home Screen Installation"
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
  event.waitUntil(
    caches.open(VERSION).then(function (cache) {
      let files = [
        '/',
        '/index.html',
        '/scripts/main.ba993360.js',
        '/scripts/vendor.f1fab690.js',
        '/styles/main.b1119fb2.css',
        '/styles/vendor.5d38139c.css',
        '/images/logo.svg',
        '/fonts/Material-Design-Icons.woff'
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

this.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open(VERSION)
      .then(function (cache) {
        if (event.request.mode === 'navigate') {
  	    // network first, fallback to cache - to make sure html updates like new script & style revved urls are handled
  	      return fetch(event.request)
  		    .catch(function () {
      		  return cache.match(event.request);
    	    });
	    }

	    // else cache first, fallback to network
        return cache.match(event.request, {ignoreSearch: true})
          .then(function (response) {
            if (response) {
              return response;
            }

            return fetch(event.request)
              .then(function (fetchResponse) {
              	// cache already fetched caniuse data
                if (fetchResponse && fetchResponse.status === 200 && event.request.url.indexOf('https://raw.githubusercontent.com') === 0) {
                  cache.put(event.request, fetchResponse.clone());
                }
                return fetchResponse;
              });
          });
      })
  );
});
