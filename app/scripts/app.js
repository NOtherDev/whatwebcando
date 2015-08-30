// jshint devel:true

(function (container) {
  'use strict';

  $.material.init();

  let defineRouting = function ({indexPageCtrl, featurePageCtrl, features}) {
    page('/', () => container.resolveAndCall(indexPageCtrl));

    Object.keys(features).forEach(function (featureId) {
      let feature = features[featureId];
      page(`/${feature.id}.html`, () => container.resolveAndCall(featurePageCtrl, feature));
    });

    page();
  };

  let initializeAndRun = function ({indexPageCtrl}) {
    container.resolveAndCall(indexPageCtrl)
      .then(() => container.resolveAndCall(defineRouting));
  };

  initializeAndRun(container.injector);

})(WWCD.container);
