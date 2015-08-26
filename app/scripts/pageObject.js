'use strict';

(function (container) {
  'use strict';

  let pageObject = {
    get featuresList() {
      return $('.features-list');
    }
  };

  container.configure(register => register.singleton('pageObject', pageObject));

})(WWCD.container);
