'use strict';

(function (container) {
  'use strict';

  let featurePageCtrl = function (feature, {templateEngine, pageObject, CaniuseReportFetch}) {
    let prefix = 'feature';
    let $target = templateEngine.targetFor(prefix);

    let collectFeatureBoxElements = function *() {
      if (feature.caniuseKey) {
        yield new CaniuseReportFetch(feature).fetch();
      }
    };

    let initializeFeatureBoxElements = function *() {
      if (feature.caniuseReport) {
        yield feature.caniuseReport.initVisuals();
      }
    };

    pageObject.featuresList.promisedSlideUp()
      .then(() => $target.promisedSlideUp())
      .then(() => Promise.all([...collectFeatureBoxElements()]))
      .then(() => templateEngine.run(prefix, {feature: feature}))
      .then(() => Promise.all([...initializeFeatureBoxElements()]))
      .then(() => $target.promisedSlideDown());
  };

  container.configure(register => register.singleton('featurePageCtrl', featurePageCtrl));

})(WWCD.container);
