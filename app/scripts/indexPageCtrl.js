(function (container) {
  'use strict';

  let supportInfosAdded = false;

  let addFeatureSupportInfo = function (feature) {
    let placeholder = document.getElementById(`support-info-placeholder-${feature.id}`);

    if (feature.supported) {
      placeholder.innerHTML = `<i class="mdi-navigation-check text-success"
        title="${feature.name} is available in your current browser" aria-label="Available in your browser"></i>`;
    } else if (feature.notSupported) {
      placeholder.innerHTML = `<i class="mdi-navigation-close text-danger"
        title="${feature.name} is not available in your current browser" aria-label="Not available in your browser"></i>`;
    }

    $('.legend').show();
  };

  let addFeatureSupportInfos = function (features) {
    Object.keys(features).forEach(key => addFeatureSupportInfo(features[key]));
  };

  let indexPageCtrl = function ({templateEngine, features}) {
    templateEngine.annotateBody('features-list');

    if (!supportInfosAdded) {
      addFeatureSupportInfos(features);
      supportInfosAdded = true;
    }
  };

  container.configure(register => register.singleton('indexPageCtrl', indexPageCtrl));

})(WWCD.container);
