const groups = [
  {
    heading: "Seamless Experience",
    features: [
      {
        id: "offline",
        icon: "mdi-action-settings-applications",
        name: "Offline Mode"
      },
      {
        id: "background-sync",
        icon: "mdi-action-backup",
        name: "Background Sync"
      },
      {
        id: "sharing",
        icon: "mdi-action-explore",
        name: "Inter-App Sharing"
      },
      {
        id: "payments",
        icon: "mdi-action-payment",
        name: "Payments"
      },
      {
        id: "credentials",
        icon: "mdi-action-lock-open",
        name: "Credentials"
      },
    ]
  },
  {
    heading: "Native Behaviors",
    features: [
      {
        id: "local-notifications",
        icon: "mdi-notification-system-update",
        name: "Local Notifications"
      },
      {
        id: "push-notifications",
        icon: "mdi-notification-tap-and-play",
        name: "Push Messages"
      },
      {
        id: "idle",
        icon: "mdi-moon",
        name: "User Idle Detection"
      },
      {
        id: "permissions",
        icon: "mdi-action-lock-open",
        name: "Permissions"
      },
      {
        id: "scheduler",
        icon: "mdi-action-alarm",
        name: "Task Scheduling"
      },
    ]
  },
  {
    heading: "App Lifecycle",
    features: [
      {
        id: "distribution",
        icon: "mdi-distribution",
        name: "Store Distribution"
      },
      {
        id: "installation",
        icon: "mdi-action-get-app",
        name: "Home Screen Installation"
      },
      {
        id: "startup",
        icon: "mdi-startup",
        name: "Run On Startup"
      },
      {
        id: "foreground-detection",
        icon: "mdi-action-flip-to-front",
        name: "Foreground Detection"
      },
      {
        id: "freeze-resume",
        icon: "mdi-lifecycle",
        name: "Freeze/Resume Detection"
      },
    ]
  },
  {
    heading: "Surroundings",
    features: [
      {
        id: "bluetooth",
        icon: "mdi-device-bluetooth",
        name: "Bluetooth"
      },
      {
        id: "nfc",
        icon: "mdi-device-nfc",
        name: "NFC"
      },
      {
        id: "usb",
        icon: "mdi-device-usb",
        name: "USB"
      },
      {
        id: "serial",
        icon: "mdi-device-serial",
        name: "Serial"
      },
      {
        id: "ambient-light",
        icon: "mdi-device-brightness-low",
        name: "Ambient Light"
      },
    ]
  },
  {
    heading: "Camera & Microphone",
    features: [
      {
        id: "camera-microphone",
        icon: "mdi-image-camera-alt",
        name: "Audio & Video Capture"
      },
      {
        id: "photos",
        icon: "mdi-image-camera-roll",
        name: "Advanced Camera Controls"
      },
      {
        id: "recording",
        icon: "mdi-av-mic",
        name: "Recording Media"
      },
      {
        id: "realtime",
        icon: "mdi-av-videocam",
        name: "Real-time Communication"
      },
      {
        id: "shape-detection",
        icon: "mdi-face",
        name: "Shape Detection"
      },
    ]
  },
  {
    heading: "Device Features",
    features: [
      {
        id: "network-type-speed",
        icon: "mdi-device-wifi-tethering",
        name: "Network Type & Speed"
      },
      {
        id: "online-state",
        icon: "mdi-device-signal-cellular-connected-no-internet-3-bar",
        name: "Online State"
      },
      {
        id: "vibration",
        icon: "mdi-notification-vibration",
        name: "Vibration"
      },
      {
        id: "battery-status",
        icon: "mdi-device-battery-80",
        name: "Battery Status"
      },
      {
        id: "memory",
        icon: "mdi-hardware-memory",
        name: "Device Memory"
      },
    ]
  },
  {
    heading: "Operating System",
    features: [
      {
        id: "storage",
        icon: "mdi-notification-folder-special",
        name: "Offline Storage"
      },
      {
        id: "files",
        icon: "mdi-device-sd-storage",
        name: "File Access"
      },
      {
        id: "contacts",
        icon: "mdi-action-account-box",
        name: "Contacts"
      },
      {
        id: "sms",
        icon: "mdi-communication-message",
        name: "SMS"
      },
      {
        id: "storage-quota",
        icon: "mdi-notification-sim-card-alert",
        name: "Storage Quotas"
      },
    ]
  },
  {
    heading: "Input",
    features: [
      {
        id: "touch",
        icon: "mdi-content-gesture",
        name: "Touch Gestures"
      },
      {
        id: "speech-recognition",
        icon: "mdi-av-mic",
        name: "Speech Recognition"
      },
      {
        id: "clipboard",
        icon: "mdi-content-content-paste",
        name: "Clipboard (Copy & Paste)"
      },
      {
        id: "pointer-adaptation",
        icon: "mdi-hardware-mouse",
        name: "Pointing Device Adaptation"
      },
      {
        id: "eye-dropper",
        icon: "mdi-eyedropper",
        name: "EyeDropper"
      },
    ]
  },
  {
    heading: "Location & Position",
    features: [
      {
        id: "geolocation",
        icon: "mdi-device-gps-fixed",
        name: "Geolocation"
      },
      {
        id: "geofencing",
        icon: "mdi-action-group-work",
        name: "Geofencing"
      },
      {
        id: "device-position",
        icon: "mdi-device-screen-rotation",
        name: "Device Position"
      },
      {
        id: "device-motion",
        icon: "mdi-action-3d-rotation",
        name: "Device Motion"
      },
      {
        id: "proximity",
        icon: "mdi-image-leak-add",
        name: "Proximity Sensors"
      },
    ]
  },
  {
    heading: "Screen & Output",
    features: [
      {
        id: "vr",
        icon: "mdi-maps-local-play",
        name: "Virtual & Augmented Reality"
      },
      {
        id: "fullscreen",
        icon: "mdi-action-settings-overscan",
        name: "Fullscreen"
      },
      {
        id: "screen-orientation",
        icon: "mdi-device-screen-lock-rotation",
        name: "Screen Orientation & Lock"
      },
      {
        id: "wake-lock",
        icon: "mdi-action-lock",
        name: "Wake Lock"
      },
      {
        id: "presentation",
        icon: "mdi-hardware-tv",
        name: "Presentation Features"
      },
    ]
  },
]

export default groups
