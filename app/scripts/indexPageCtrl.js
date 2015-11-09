(function (container) {
  'use strict';

  let indexPageCtrl = function ({templateEngine}) {
    templateEngine.annotateBody('features-list');
  };

  container.configure(register => register.singleton('indexPageCtrl', indexPageCtrl));

})(WWCD.container);
