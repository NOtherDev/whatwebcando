import {Feature} from "../../utils/feature";

export default new Feature({
  id: 'screen-orientation',
  aliases: ['orientation-lock'],
  name: 'Screen Orientation & Lock',
  description: [`The <b>Screen Orientation API</b> allows Web applications to get the information about the current orientation of the document
        (portrait or landscape) as well as to lock the screen orientation in a requested state.`,
    `The current version of the specification defines this feature fully within <code>window.screen.orientation</code> object. The previous version,
        implemented once in Microsoft Edge, separated the orientation lock to <code>window.screen.lockOrientation</code>.`
  ],
  api: `<dl>
        <dt><code>window.screen.orientation.type</code></dt>
        <dd>Returns the current screen orientation type as one of <code>portrait-primary</code>, <code>portrait-secondary</code> (upside down),
          <code>landscape-primary</code> and <code>landscape-secondary</code> (upside down).</dd>
        <dt><code>window.screen.orientation.addEventListener('change', listener)</code></dt>
        <dd>An event fired when the document orientation has changed.</dd>
        <dt><code>window.screen.orientation.lock(lockType)</code></dt>
        <dd>Requests a screen lock in the <code>lockType</code> specified. Returns a <code>Promise</code> resolved when the lock was acquired successfully.</dd>
        <dt><code>window.screen.orientation.unlock()</code></dt>
        <dd>Removes previously acquired screen orientation lock.</dd>
      </dl>`,
  caniuse: 'screen-orientation',
  demo: {
    html: `<div id="device"></div>

<p>Current screen orientation is <b id="orientationType">unknown</b>.</p>

<p>
  <button id="lock">Lock in current orientation</button>
  <button id="unlock">Release the lock</button>
</p>

<p id="logTarget"></p>`,
    css: `#device {
  margin: 10px;
  border: 1px solid black;
  border-radius: 10px;
}

#device:after {
  content: 'A';
  font: 80px serif;
  display: block;
  text-align: center;
}

#unlock {
  display: none;
}`,
    js: `var $ = document.getElementById.bind(document);

var orientKey = 'orientation';
if ('mozOrientation' in screen) {
  orientKey = 'mozOrientation';
} else if ('msOrientation' in screen) {
  orientKey = 'msOrientation';
}

var target = $('logTarget');
var device = $('device');
var orientationTypeLabel = $('orientationType');

function logChange (event) {
  var timeBadge = new Date().toTimeString().split(' ')[0];
  var newState = document.createElement('p');
  newState.innerHTML = '<span class="badge">' + timeBadge + '</span> ' + event + '.';
  target.appendChild(newState);
}

if (screen[orientKey]) {
  function update() {
    var type = screen[orientKey].type || screen[orientKey];
    orientationTypeLabel.innerHTML = type;

    var landscape = type.indexOf('landscape') !== -1;

    if (landscape) {
      device.style.width = '180px';
      device.style.height = '100px';
    } else {
      device.style.width = '100px';
      device.style.height = '180px';
    }

    var rotate = type.indexOf('secondary') === -1 ? 0 : 180;
    var rotateStr = 'rotate(' + rotate + 'deg)';

    device.style.webkitTransform = rotateStr;
    device.style.MozTransform = rotateStr;
    device.style.transform = rotateStr;
  }

  update();

  var onOrientationChange = null;

  if ('onchange' in screen[orientKey]) { // newer API
    onOrientationChange = function () {
      logChange('Orientation changed to <b>' + screen[orientKey].type + '</b>');
      update();
    };
  
    screen[orientKey].addEventListener('change', onOrientationChange);
  } else if ('onorientationchange' in screen) { // older API
    onOrientationChange = function () {
      logChange('Orientation changed to <b>' + screen[orientKey] + '</b>');
      update();
    };
  
    screen.addEventListener('orientationchange', onOrientationChange);
  }

  // browsers require full screen mode in order to obtain the orientation lock
  var goFullScreen = null;
  var exitFullScreen = null;
  if ('requestFullscreen' in document.documentElement) {
    goFullScreen = 'requestFullscreen';
    exitFullScreen = 'exitFullscreen';
  } else if ('mozRequestFullScreen' in document.documentElement) {
    goFullScreen = 'mozRequestFullScreen';
    exitFullScreen = 'mozCancelFullScreen';
  } else if ('webkitRequestFullscreen' in document.documentElement) {
    goFullScreen = 'webkitRequestFullscreen';
    exitFullScreen = 'webkitExitFullscreen';
  } else if ('msRequestFullscreen') {
    goFullScreen = 'msRequestFullscreen';
    exitFullScreen = 'msExitFullscreen';
  }

  $('lock').addEventListener('click', function () {
    document.documentElement[goFullScreen] && document.documentElement[goFullScreen]();

    var promise = null;
    if (screen[orientKey].lock) {
      promise = screen[orientKey].lock(screen[orientKey].type);
    } else {
      promise = screen.orientationLock(screen[orientKey]);
    }

    promise
      .then(function () {
        logChange('Screen lock acquired');
        $('unlock').style.display = 'block';
        $('lock').style.display = 'none';
      })
      .catch(function (err) {
        logChange('Cannot acquire orientation lock: ' + err);
        document[exitFullScreen] && document[exitFullScreen]();
      });
  });

  $('unlock').addEventListener('click', function () {
    document[exitFullScreen] && document[exitFullScreen]();

    if (screen[orientKey].unlock) {
      screen[orientKey].unlock();
    } else {
      screen.orientationUnlock();
    }

    logChange('Screen lock removed.');
    $('unlock').style.display = 'none';
    $('lock').style.display = 'block';
  });
}`,
    jsOnExit: `if ('onchange' in screen[orientKey]) { // newer API
    screen[orientKey].removeEventListener('change', onOrientationChange);
  } else if ('onorientationchange' in screen) { // older API
    screen.removeEventListener('orientationchange', onOrientationChange);
  }`
  },
  tests: [
    Feature.containedIn('screen', typeof(window) !== 'undefined' && window.screen, 'orientation'),
    Feature.containedIn('screen', typeof(window) !== 'undefined' && window.screen, 'lockOrientation', false)
  ],
  links: [
    {url: 'https://w3c.github.io/screen-orientation/', title: 'Specification Draft'},
    {url: 'https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation', title: 'MDN: Screen.orientation'},
    {
      url: 'http://www.sitepoint.com/introducing-screen-orientation-api/',
      title: 'SitePoint: Introducing the Screen Orientation API'
    }
  ]
})
