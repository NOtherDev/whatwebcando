(function (container) {
  'use strict';

  let featurePageCtrl = function (feature, {templateEngine, CaniuseReportFetch}) {
    const prefix = 'feature';

    let collectFeatureBoxElements = function *() {
      if (feature.caniuseKey) {
        yield new CaniuseReportFetch(feature).fetch();
      }
    };

    let initHighlight = () => {
      if (feature.api) {
        Prism.highlightAll();
      }
    };

    let initCodePen = () => {
      if (feature.demoPen && window.__CPEmbed) {
        window.__CPEmbed();

        if (!window.location.protocol.startsWith('https')) {
          // force CodePen frame in HTTPS, even if WWCD isn't
          let $penFrame = $('iframe.cp_embed_iframe');
          $penFrame.attr('src', `https:${$penFrame.attr('src')}`);
        }
      }
    };

    let initTests = () => {
      let testsContainer = document.getElementById('tests-placeholder');
      if (feature.tests.length) {
        let tests = feature.tests.map(test => {
          let bgClass = 'default';

          if (test.result.passed) {
            bgClass = test.result.prefix || !test.result.standard ? 'warning' : 'success';
          } else if (test.result.standard) {
            bgClass = 'danger';
          }

          let iconClass = test.result.passed ? 'mdi-navigation-check' : 'mdi-navigation-close';

          return `<div class="feature-test bg-${bgClass}">
            <div class="pull-left"><code>${test.containerName}.${test.result.prefix}${test.result.property}</code></div>
            <div class="pull-right"><i class="${iconClass}"></i> ${test.result.message}</div>
          </div>`;
        });
        testsContainer.innerHTML = tests.join('');
        testsContainer.parentNode.classList.remove('hidden');
      } else {
        testsContainer.parentNode.classList.add('hidden');
      }
    };

    let setAccesibilityFeatures = () => {
      $('.features-list .btn').attr('tabindex', '-1');
      $('.hide-on-feature-page').attr('aria-expanded', 'false');
    };

    let initializeFeatureBoxElements = function *() {
      if (feature.caniuseReport) {
        yield feature.caniuseReport.initVisuals();
      }

      initHighlight();
      initCodePen();
      initTests();
      setAccesibilityFeatures();
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
