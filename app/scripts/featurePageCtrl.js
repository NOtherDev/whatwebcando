'use strict';

(function (container) {
  'use strict';

  let featurePageCtrl = function (feature, {templateEngine}) {
      templateEngine.run('feature', {
        feature: feature
      });
  };

  container.configure(register => register.singleton('featurePageCtrl', featurePageCtrl));

})(WWCD.container);
