(function (container) {
  'use strict';

  let pageChangedCounter = 0;

  const notifyPageChanged = path => {
    pageChangedCounter += 1;

    if (window.ga) {
      window.ga('set', 'page', path);
      window.ga('set', 'online', navigator.onLine);
      window.ga('send', 'pageview');
    }

    if (!!document.querySelector('#carbonads') && typeof window._carbonads !== 'undefined' && pageChangedCounter % 3 === 0) {
      window._carbonads.refresh();
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

    let currentFeature;

    Object.keys(features).forEach(function (featureId) {
      let feature = features[featureId];
      page(`/${feature.id}.html`, () => {
        if (currentFeature) {
          featurePageCtrl.onExit(currentFeature);
        }

        currentFeature = feature;
        container.resolveAndCall(featurePageCtrl, feature);
      });
    });

    page();
  };

  const initializeAndRun = ({indexPageCtrl}) => {
    container.resolveAndCall(indexPageCtrl);
    container.resolveAndCall(defineRouting);
  };

  initializeAndRun(container.injector);

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => registration.update())
        .catch(error => console.warn('SW registration failed with ' + error));
    });

    window.addEventListener('beforeinstallprompt', event => {
      window.ga = window.ga || (() => {});
      window.ga('send', 'event', 'PWA.install', 'prompt');

      event.preventDefault();

      const $header = document.querySelector('header');
      $header.insertAdjacentHTML('afterend', `<div id="triggerPrompt" class="panel panel-body install-prompt">
          <p class="pull-left">Do you want to install this application to your Home Screen?</p>
          <button class="pull-right btn bg-success" id="triggerPromptPositive">Yes, I do!</button>
          <button class="pull-right btn btn-default" id="triggerPromptNegative">No</button>
        </div>`);

      const $triggerPrompt = document.querySelector('#triggerPrompt');

      const $triggerPromptPositive = document.querySelector('#triggerPromptPositive');
      $triggerPromptPositive.addEventListener('click', () => {
        window.ga('send', 'event', 'PWA.install', 'triggerPromptPositive');

        event.userChoice.then(choice => {
          window.ga('send', 'event', 'PWA.install', choice.outcome);
          $triggerPrompt.parentElement.removeChild($triggerPrompt);
        });

        event.prompt();
      });

      const $triggerPromptNegative = document.querySelector('#triggerPromptNegative');
      $triggerPromptNegative.addEventListener('click', () => {
        window.ga('send', 'event', 'PWA.install', 'triggerPromptNegative');
        $triggerPrompt.parentElement.removeChild($triggerPrompt);
      });
    });
  }

})(WWCD.container);
