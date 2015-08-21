'use strict';

(function (WWCD) {
  'use strict';

  WWCD.indexPageCtrl = function ({templateEngine, featuresGroups}) {
    templateEngine.run('features-list', {
      groups: featuresGroups
    });
  };

})(window.WWCD = (window.WWCD || {}));
