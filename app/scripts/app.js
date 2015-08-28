// jshint devel:true

(function (container) {
  'use strict';

  $.material.init();

  let defineRouting = function({indexPageCtrl, featurePageCtrl, features}) {
    page('/', () => container.resolveFunc(indexPageCtrl));

    Object.keys(features).forEach(function (featureId) {
      let feature = features[featureId];
      page(`/${feature.id}.html`, () => container.resolveFunc(featurePageCtrl, feature));
    });

    page();
  };

  defineRouting(container.injector);

})(WWCD.container);
