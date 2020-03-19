import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'fullscreen',
  name: 'Fullscreen',
  description: `The <b>Fullscreen API</b> allows Web applications to present itself or the part of itself in the fullscreen mode,
        without browser UI elements visible. It also serves as the prerequisite state for the <a href="/screen-orientation.html">orientation lock</a>.`,
  api: `<dl>
        <dt><code>document.fullscreenEnabled</code></dt>
        <dd>Returns a boolean indicating whether the fullscreen mode is available and allowed.</dd>
        <dt><code>element.requestFullscreen()</code></dt>
        <dd>Requests a fullscreen mode display for a given <code>element</code>. Returns a <code>Promise</code> resolved when the request was successful.</dd>
        <dt><code>document.fullscreenElement</code></dt>
        <dd>Returns a reference to the element currently being displayed in the fullscreen mode.</dd>
        <dt><code>document.exitFullscreen()</code></dt>
        <dd>Exits the fullscreen mode.</dd>
        <dt><code>document.addEventListener('fullscreenchange', listener)</code></dt>
        <dd>An event fired when the fullscreen mode has been entered or exited.</dd>
      </dl>`,
  caniuse: 'fullscreen',
  demo: {
    html: `<p>
  <button class="start" id="startFull">Start fullscreen on the whole page</button>
  <button id="exit">Exit fullscreen</button>
</p>

<div>
  <button class="start" id="startBox">Start fullscreen on just the green box</button>
  <div id="box">THE BOX</div>
</div>

<p id="logTarget"></p>`,
    css: `#box {
  width: 90px;
  height: 20px;
  background-color: green;
  color: white;
  text-align: center;
  display: inline-block;
  border-radius: 5px;
}

#exit {
  display: none;
}`,
    js: `var $ = document.querySelector.bind(document);
var $$ = function (selector) {
  return [].slice.call(document.querySelectorAll(selector), 0);
}
var target = $('#logTarget');

function logChange (event) {
  var timeBadge = new Date().toTimeString().split(' ')[0];
  var newState = document.createElement('p');
  newState.innerHTML = '<span class="badge">' + timeBadge + '</span> ' + event + '.';
  target.appendChild(newState);
}

var prefix = null;
if ('requestFullscreen' in document.documentElement) {
  prefix = 'fullscreen';
} else if ('mozRequestFullScreen' in document.documentElement) {
  prefix = 'mozFullScreen';
} else if ('webkitRequestFullscreen' in document.documentElement) {
  prefix = 'webkitFullscreen';
} else if ('msRequestFullscreen') {
  prefix = 'msFullscreen';
}

var onFullscreenChange = function () {
  var elementName = 'not set';
  if (document[prefix + 'Element']) {
    elementName = document[prefix + 'Element'].nodeName;
  }
  logChange('New fullscreen element is <b>' + elementName + '</b>');
  onFullscreenHandler(!!document[prefix + 'Element']);
}

if (document[prefix + 'Enabled']) {
  var onFullscreenHandler = function (started) {
    $('#exit').style.display = started ? 'inline-block' : 'none';
    $$('.start').forEach(function (x) {
      x.style.display = started ? 'none' : 'inline-block';
    });
  };

  document.addEventListener(prefix.toLowerCase() + 'change', onFullscreenChange);

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

  var goFullscreenHandler = function (element) {
    return function () {
      var maybePromise = element[goFullScreen]();
      if (maybePromise && maybePromise.catch) {
        maybePromise.catch(function (err) {
          logChange('Cannot acquire fullscreen mode: ' + err);
        });
      }
    };
  };

  $('#startFull').addEventListener('click', goFullscreenHandler(document.documentElement));
  $('#startBox').addEventListener('click', goFullscreenHandler($('#box')));

  $('#exit').addEventListener('click', function () {
    document[exitFullScreen]();
  });
}`,
    jsOnExit: `document.removeEventListener(prefix.toLowerCase() + 'change', onFullscreenChange);`
  },
  tests: [
    Feature.containedIn('document.documentElement', typeof(window) !== 'undefined' && window.document && document.documentElement, 'requestFullScreen'),
    Feature.containedIn('document.documentElement', typeof(window) !== 'undefined' && window.document && document.documentElement, 'requestFullscreen')
  ],
  links: [
    {url: 'https://fullscreen.spec.whatwg.org/', title: 'Specification'},
    {url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API', title: 'MDN: Fullscreen API'},
    {
      url: 'https://hacks.mozilla.org/2012/01/using-the-fullscreen-api-in-web-browsers/',
      title: 'Mozilla Hacks: Using the Fullscreen API in Web browsers'
    }
  ]
})
