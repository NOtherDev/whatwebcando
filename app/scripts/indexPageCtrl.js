'use strict';

(function (container) {
  'use strict';

  let indexPageCtrl = function ({templateEngine, featuresGroups, pageObject}) {
    templateEngine.run('features-list', { groups: featuresGroups });

    return pageObject.featurePageElements.promisedSlideUp()
      .then(() => pageObject.indexElements.promisedSlideDown());
  };

  container.configure(register => register.singleton('indexPageCtrl', indexPageCtrl));

})(WWCD.container);
