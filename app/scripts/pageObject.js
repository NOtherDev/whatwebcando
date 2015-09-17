'use strict';

(function (container) {
  'use strict';

  let pageObject = {
    get indexElements() {
      return $('.hide-on-feature-page');
    },
    get featurePageElements() {
      return $('.show-on-feature-page');
    }
  };

  container.configure(register => register.singleton('pageObject', pageObject));

})(WWCD.container);
