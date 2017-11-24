(function (container) {
  'use strict';

  let supportInfosAdded = false;

  let addFeatureSupportInfo = function (feature) {
    let placeholder = document.getElementById(`support-info-placeholder-${feature.id}`);

    feature.determineIsSupported()
      .then(isSupported => {
        if (isSupported) {
          placeholder.innerHTML = `<i class="mdi-navigation-check text-success"
        title="${feature.name} is available in your current browser" aria-label="Available in your browser"></i>`;
        } else {
          placeholder.innerHTML = `<i class="mdi-navigation-close text-danger"
        title="${feature.name} is not available in your current browser" aria-label="Not available in your browser"></i>`;
        }
      });

    document.querySelector('.legend').style.display = 'block';
  };

  let addFeatureSupportInfos = function (features) {
    Object.keys(features).forEach(key => addFeatureSupportInfo(features[key]));
  };

  let indexPageCtrl = function ({templateEngine, features}) {
    templateEngine.annotateBody('features-list');
    $$('.features-list .btn').forEach(n => n.removeAttribute('tabindex'));
    $$('.hide-on-feature-page').forEach(n => n.setAttribute('aria-expanded', 'true'));

    if (!supportInfosAdded) {
      addFeatureSupportInfos(features);
      supportInfosAdded = true;
    }
  };

  container.configure(register => register.singleton('indexPageCtrl', indexPageCtrl));

})(WWCD.container);
