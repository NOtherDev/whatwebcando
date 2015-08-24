'use strict';

(function (container) {
  'use strict';

  let indexPageCtrl = function ({templateEngine, featuresGroups}) {
    templateEngine.run('features-list', {
      groups: featuresGroups
    });
  };

  container.configure(register => register.singleton('indexPageCtrl', indexPageCtrl));

})(WWCD.container);
