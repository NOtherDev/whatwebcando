// jshint devel:true

(function (WWCD) {
  'use strict';

  let templateEngine = {
    run(templatePrefix, context = {}) {
      let template = Handlebars.compile($(`\#${templatePrefix}-template`).html());
      $(`\#${templatePrefix}-target`).html(template(context));
    }
  };

  WWCD.injector = {
    templateEngine: templateEngine,
    featuresGroups: WWCD.featuresGroups
  };

})(window.WWCD = (window.WWCD || {}));
