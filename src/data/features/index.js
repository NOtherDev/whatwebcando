import localNotifications from "./localNotifications";
import pushNotifications from "./pushNotifications";
import offline from "./offline";
import installation from "./installation";
import foregroundDetection from "./foregroundDetection";
import geolocation from "./geolocation";
import bluetooth from "./bluetooth";
import nfc from "./nfc";
import proximity from "./proximity";
import ambientLight from "./ambientLight";
import cameraMicrophone from "./cameraMicrophone";
import networkTypeSpeed from "./networkTypeSpeed";
import onlineState from "./onlineState";
import vibration from "./vibration";
import batteryStatus from "./batteryStatus";
import storage from "./storage";
import files from "./files";
import permissions from "./permissions";
import contacts from "./contacts";
import storageQuota from "./storageQuota";
import touch from "./touch";
import deviceMotion from "./deviceMotion";
import speechRecognition from "./speechRecognition";
import clipboard from "./clipboard";
import pointerAdaptation from "./pointerAdaptation";
import devicePosition from "./devicePosition";
import fullscreen from "./fullscreen";
import screenOrientation from "./screenOrientation";
import wakeLock from "./wakeLock";
import photos from "./photos";
import presentation from "./presentation";
import backgroundSync from "./backgroundSync";
import appCommunication from "./appCommunication";
import recording from "./recording";
import realtime from "./realtime";
import geofencing from "./geofencing";
import payments from "./payments";
import credentials from "./credentials";
import memory from "./memory";
import usb from "./usb";
import sms from "./sms";
import scheduler from "./scheduler";
import vr from "./vr";

const features = [
  localNotifications,
  pushNotifications,
  offline,
  installation,
  foregroundDetection,
  geolocation,
  bluetooth,
  nfc,
  proximity,
  ambientLight,
  cameraMicrophone,
  networkTypeSpeed,
  onlineState,
  vibration,
  batteryStatus,
  storage,
  files,
  permissions,
  contacts,
  storageQuota,
  touch,
  deviceMotion,
  speechRecognition,
  clipboard,
  pointerAdaptation,
  devicePosition,
  fullscreen,
  screenOrientation,
  wakeLock,
  photos,
  presentation,
  backgroundSync,
  appCommunication,
  recording,
  realtime,
  geofencing,
  payments,
  credentials,
  memory,
  usb,
  sms,
  scheduler,
  vr,
];

export default features
