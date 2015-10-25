'use strict';

(function (container) {
  'use strict';

  let indexPageCtrl = function ({templateEngine, featuresGroups}) {
    return templateEngine.runOnce('features-list', { groups: featuresGroups });
  };

  container.configure(register => register.singleton('indexPageCtrl', indexPageCtrl));

})(WWCD.container);
