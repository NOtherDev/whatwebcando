(function (container) {
  'use strict';

  let featurePageCtrl = function (feature, {templateEngine, CaniuseReportFetch}) {
    const prefix = 'feature';

    const beginFetchingCaniuseReport = () => {
      if (feature.caniuseKey) {
        return new CaniuseReportFetch(feature).fetch();
      }

      return Promise.resolve();
    };

    const initHighlight = () => {
      if (feature.api) {
        Prism.highlightAll();
      }
    };

    const initDemo = () => {
      if (feature.demo) {
        cleanAndRunScript(feature.demo.js);
      }
    };

    const initTests = () => {
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

    const setAccesibilityFeatures = () => {
      $$('.features-list .btn').forEach(n => n.setAttribute('tabindex', '-1'));
      $$('.hide-on-feature-page').forEach(n => n.setAttribute('aria-expanded', 'false'));
    };

    const initializeFeatureBoxElements = caniuseReportPromise => {
      if (feature.caniuseKey) {
        caniuseReportPromise.then(() => feature.caniuseReport.initVisuals());
      }

      initHighlight();
      initDemo();
      initTests();
      setAccesibilityFeatures();
    };

    let $target = templateEngine.targetElementFor(prefix);

    const onTransitionEndEvents = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend'.split(' ');
    const onTransitionEnd = () => {
      if ($target.offsetHeight) {
        let heightCorrectionForNavbar = outerHeight(document.querySelector('.navbar'));
        let targetOffsetTop = $target.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({left: 0, top: targetOffsetTop - heightCorrectionForNavbar, behavior: 'smooth'});
      }

      for (let event of onTransitionEndEvents) {
        $target.removeEventListener(event, onTransitionEnd);
      }
    };

    for (let event of onTransitionEndEvents) {
      $target.addEventListener(event, onTransitionEnd);
    }

    let caniuseReportPromise = beginFetchingCaniuseReport();
    templateEngine.run(prefix, {feature: feature});
    initializeFeatureBoxElements(caniuseReportPromise);
  };

  featurePageCtrl.onExit = feature => {
    if (feature.demo && feature.demo.jsOnExit) {
      runOneOffScript(feature.demo.jsOnExit);
    }
  };

  container.configure(register => register.singleton('featurePageCtrl', featurePageCtrl));

})(WWCD.container);
