import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'touch',
  name: 'Touch Gestures',
  description: [`Traditionally, Web relies on a mouse and a keyboard as the only input devices, while mobile devices are mostly controlled by touch.
        Mobile Web started with a bit touchy solution of translating touch events to mouse events like <code>mousedown</code>.`,
    `Newer HTML5 approach is to embrace touch as the first-class input mean, allowing Web applications to intercept and identify complex multitouch
         gestures, free-hand drawing etc. Unfortunately, the support is twofold - either via touch events like <code>touchstart</code> that were first
         introduced by Apple and standardized later as a de facto solution, when other vendors went the same route, or via the newer,
         more general <b>Pointer Events</b> specification, initiated by Microsoft.`],
  api: `<p><b>Touch Events API</b></p>
        <dl>
          <dt><code>element.addEventListener('touchstart', listener)</code></dt>
          <dd>An event triggered when the finger has been placed on a DOM element.</dd>
          <dt><code>element.addEventListener('touchmove', listener)</code></dt>
          <dd>An event triggered when the finger has been dragged along a DOM element.</dd>
          <dt><code>element.addEventListener('touchend', listener)</code></dt>
          <dd>An event triggered when the finger has been removed from a DOM element.</dd>
        </dl>
        <p><b>Pointer Events API</b></p>
        <dl>
          <dt><code>element.addEventListener('pointerdown', listener)</code></dt>
          <dd>An event triggered when the finger has been placed on a DOM element.</dd>
          <dt><code>element.addEventListener('pointermove', listener)</code></dt>
          <dd>An event triggered when the finger has been dragged along a DOM element.</dd>
          <dt><code>element.addEventListener('pointerup', listener)</code></dt>
          <dd>An event triggered when the finger has been removed from a DOM element.</dd>
        </dl>`,
  //caniuse: ['touch', 'pointer'], //TODO multiple caniuse refs
  caniuse: 'touch',
  demo: {
    html: `<div class="test-element">Drag me with one finger</div>
<div class="test-element">Drag me with another finger</div>
<div class="test-element">Drag me too</div>

<p><small>Based on demo from <a href="https://www.quirksmode.org/m/tests/drag2.html">QuirksMode.org</a>.</small></p>`,
    css: `.test-element {
  height: 100px;
  background-color: black;
  width: 100px;
  z-index: 5;
  position: absolute;
  top: 15px;
  left: 15px;
  color: white;
  text-align: center;
  -ms-touch-action: none;
}

.test-element:nth-child(2) {
  top: 150px;
  left: 150px;
}

.test-element:nth-child(3) {
  top: 50px;
  left: 100px;
}`,
    cssHidden: `.demo-placeholder {
  min-height: 300px;
}`,
    js: `function startDrag(e) {
  this.ontouchmove = this.onmspointermove = moveDrag;

  this.ontouchend = this.onmspointerup = function () {
    this.ontouchmove = this.onmspointermove = null;
    this.ontouchend = this.onmspointerup = null;
  }

  var pos = [this.offsetLeft, this.offsetTop];
  var that = this;
  var origin = getCoors(e);

  function moveDrag(e) {
    var currentPos = getCoors(e);
    var deltaX = currentPos[0] - origin[0];
    var deltaY = currentPos[1] - origin[1];
    this.style.left = (pos[0] + deltaX) + 'px';
    this.style.top = (pos[1] + deltaY) + 'px';
    return false; // cancels scrolling
  }

  function getCoors(e) {
    var coors = [];
    if (e.targetTouches && e.targetTouches.length) {
      var thisTouch = e.targetTouches[0];
      coors[0] = thisTouch.clientX;
      coors[1] = thisTouch.clientY;
    } else {
      coors[0] = e.clientX;
      coors[1] = e.clientY;
    }
    return coors;
  }
}

var elements = document.querySelectorAll('.test-element');
[].forEach.call(elements, function (element) {
  element.ontouchstart = element.onmspointerdown = startDrag;
});

document.ongesturechange = function () {
  return false;
}`
  },
  tests: [
    Feature.windowContains('ontouchstart'),
    Feature.windowContains('onpointerdown')
  ],
  links: [
    {url: 'https://w3c.github.io/touch-events/', title: 'Touch Events API Specification'},
    {url: 'https://w3c.github.io/pointerevents/', title: 'Pointer Events API Specification Draft'},
    {url: 'http://www.quirksmode.org/mobile/tableTouch.html', title: 'Detailed support table'},
    {url: 'http://www.html5rocks.com/en/mobile/touch/', title: 'Multi-touch Web Development'}
  ]
})
