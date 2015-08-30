'use strict';

(function (container) {
  'use strict';

  let indexPageCtrl = function ({templateEngine, featuresGroups, pageObject}) {
    templateEngine.run('features-list', { groups: featuresGroups });

    return templateEngine.targetFor('feature').promisedSlideUp()
      .then(() => pageObject.featuresList.promisedSlideDown());
  };

  container.configure(register => register.singleton('indexPageCtrl', indexPageCtrl));

})(WWCD.container);
