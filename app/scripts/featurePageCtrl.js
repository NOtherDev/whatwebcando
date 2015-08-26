'use strict';

(function (container) {
  'use strict';

  let featurePageCtrl = function (feature, {templateEngine, pageObject}) {
    let prefix = 'feature';
    let $target = templateEngine.targetFor(prefix);

    pageObject.featuresList.promisedSlideUp()
      .then(() => $target.promisedSlideUp())
      .then(() => templateEngine.run(prefix, {feature: feature}))
      .then(() => $target.promisedSlideDown());
  };

  container.configure(register => register.singleton('featurePageCtrl', featurePageCtrl));

})(WWCD.container);
