'use strict';

(function (container) {
  'use strict';

  let featurePageCtrl = function (feature, {templateEngine, CaniuseReportFetch}) {
    let prefix = 'feature';

    let collectFeatureBoxElements = function *() {
      if (feature.caniuseKey) {
        yield new CaniuseReportFetch(feature).fetch();
      }
    };

    let initializeFeatureBoxElements = function *() {
      if (feature.caniuseReport) {
        yield feature.caniuseReport.initVisuals();
      }

      if (feature.api) {
        Prism.highlightAll();
      }

      if (feature.demoPen && window.CodePenEmbed) {
        window.CodePenEmbed.init();

        if (!window.location.protocol.startsWith('https')) {
          // force CodePen frame in HTTPS, even if WWCD isn't
          let penFrame = $('iframe.cp_embed_iframe');
          penFrame.attr('src', `https:${penFrame.attr('src')}`);
        }
      }
    };

    let $target = templateEngine.targetElementFor(prefix);
    $target.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', () => {
      if ($target.height()) {
        let heightCorrectionForNavbar = $('.navbar').outerHeight(true);
        $('html,body').animate({scrollTop: $target.offset().top - heightCorrectionForNavbar}, 500);
      }
    });

    Promise.all([...collectFeatureBoxElements()])
      .then(() => templateEngine.run(prefix, {feature: feature}))
      .then(() => Promise.all([...initializeFeatureBoxElements()]));
  };

  container.configure(register => register.singleton('featurePageCtrl', featurePageCtrl));

})(WWCD.container);
