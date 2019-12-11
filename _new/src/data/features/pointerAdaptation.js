import {Feature} from "../../utils/feature";

export default new Feature({
  id: 'pointer-adaptation',
  name: 'Pointing Device Adaptation',
  description: [`The <b>Interaction Media</b> part of CSS4 specification defines the media queries allowing Web applications to alter its layout
        and user interface depending on the way the user is supposed to interact with the application. It allows to identify the browser's primary
        pointer (i.e. mouse, touch, keyboard) and decides whether it is fine or coarse and whether hovering over the element is possible using
        the "classic" interface (like touch on tablet), so that the interface might be shrunk or enlarged and hover interactions enabled
        or replaced with an alternative accordingly.`,
    `Additionally, the specification defines the similar media queries for cases when all the pointing methods (not only the primary one)
        should be considered - i.e. to answer the question is hovering possible at all, using any method available.`],
  api: `<dl class="language-css">
        <dt><code>@media (pointer: fine)</code></dt>
        <dd>The media query that limits the enclosed CSS rules to be used only when the primary pointing device allows accurate pointing.</dd>
        <dt><code>@media (pointer: coarse)</code></dt>
        <dd>The media query that limits the enclosed CSS rules to be used only when the primary pointing device does not allow accurate pointing.</dd>
        <dt><code>@media (pointer: none)</code></dt>
        <dd>The media query that limits the enclosed CSS rules to be used only when the primary interacting device is not capable of pointing
          (i.e. keyboard).</dd>
        <dt><code>@media (hover)</code></dt>
        <dd>The media query that limits the enclosed CSS rules to be used only when the primary pointing device allows hovering over elements.</dd>
        <dt><code>@media (any-pointer: fine)</code></dt>
        <dd>The media query that limits the enclosed CSS rules to be used only when any of the pointing devices available allows accurate pointing.</dd>
        <dt><code>@media (any-pointer: coarse)</code></dt>
        <dd>The media query that limits the enclosed CSS rules to be used only when any of the pointing devices does not allow accurate pointing.</dd>
        <dt><code>@media (any-hover)</code></dt>
        <dd>The media query that limits the enclosed CSS rules to be used only when any of the pointing devices allows hovering over elements.</dd>
      </dl>`,
  caniuse: 'css-media-interaction',
  tests: [
    Feature.rawTest('window', `matchMedia('(pointer: none), (pointer: coarse), (pointer: fine)').matches`, () => typeof(window) !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: none), (pointer: coarse), (pointer: fine)').matches)
  ],
  demo: {
    html: `<p>The button is larger when the primary pointer is coarse. The tooltip is visible on hover when the pointer allows hovering.</p>

<div class="text-center">
  <button id="button">The button</button>
  <div id="tooltip" class="tooltip bottom" role="tooltip">
    <div class="tooltip-arrow"></div>
    <div class="tooltip-inner">
      Tooltip visible on hover when pointer allows hover
    </div>
  </div>
</div>`,
    css: `@media (hover: hover) {
  #tooltip {
    display: none;
  }
  #button:hover ~ #tooltip {
    display: block;
  }
}

@media (pointer: fine) {
  #button {
    font-size: x-small;
  }
}
@media (pointer: coarse) {
  #button {
    font-size: x-large;
  }
}`,
    cssHidden: `p, button {
  margin: 10px;
}
#tooltip {
  position: relative;
  opacity: 1;
}
#tooltip .tooltip-inner {
  margin: 0 auto;
}`
  },
  links: [
    {url: 'http://www.w3.org/TR/mediaqueries-4/#mf-interaction', title: 'Specification Draft'},
    {
      url: 'http://jordanm.co.uk/2013/11/11/potential-use-cases-for-script-hover-and-pointer.html',
      title: 'Potential use cases for script, hover and pointer CSS Level 4 Media Features'
    },
    {
      url: 'https://dev.opera.com/articles/media-features/',
      title: 'Dev.Opera: Interaction Media Features and their potential (for incorrect assumptions)'
    },
    {
      url: 'https://github.com/twbs/mq4-hover-shim',
      title: 'A shim for the Media Queries Level 4 `hover` media feature'
    },
    {url: 'http://radar.oreilly.com/2015/08/proposing-css-input-modailty.html', title: 'Proposing CSS input modality'}
  ]
})
