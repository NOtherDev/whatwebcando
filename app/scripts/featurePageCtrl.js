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
        Promise.all(feature.tests.map(test => test.result))
          .then(tests => {
            let testResults = tests.map((test, index) => {
              let bgClass = 'default';

              if (test.passed) {
                bgClass = test.prefix || !test.standard ? 'warning' : 'success';
              } else if (test.standard) {
                bgClass = 'danger';
              }

              let iconClass = test.passed ? 'mdi-navigation-check' : 'mdi-navigation-close';

              return `<div class="feature-test bg-${bgClass}">
                <div class="pull-left"><code>${feature.tests[index].containerName}.${test.prefix}${test.property}</code></div>
                <div class="pull-right"><i class="${iconClass}"></i> ${test.message}</div>
              </div>`;
            });

            testsContainer.innerHTML = testResults.join('');
            testsContainer.parentNode.classList.remove('hidden');
          });

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
    const onTransitionEnd = event => {
      if (event.target === $target && $target.offsetHeight) {
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
