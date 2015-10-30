// jshint devel:true

(function (container) {
  'use strict';

  $.material.init();

  let notifyPageChanged = path => {
    if (window.ga) {
      window.ga('set', 'page', path);
      window.ga('send', 'pageview');
    }
  };

  let defineRouting = function ({indexPageCtrl, featurePageCtrl, features}) {
    let base = location.pathname.split('/');
    base.pop();
    page.base(base.join('/'));

    page((ctx, next) => {
      notifyPageChanged(ctx.path);
      next();
    });

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
