(function (container) {
  'use strict';

  const notifyPageChanged = path => {
    if (window.ga) {
      window.ga('set', 'page', path);
      window.ga('send', 'pageview');
    }
  };

  const defineRouting = ({indexPageCtrl, featurePageCtrl, features}) => {
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

  const initializeAndRun = ({indexPageCtrl}) => {
    container.resolveAndCall(indexPageCtrl);
    container.resolveAndCall(defineRouting);
  };

  initializeAndRun(container.injector);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => registration.update())
      .catch(error => console.warn('SW registration failed with ' + error));
  }

})(WWCD.container);
