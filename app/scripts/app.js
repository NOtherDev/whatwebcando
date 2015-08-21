// jshint devel:true

(function (WWCD) {
  'use strict';

  $.material.init();

  // routing
  page('/', () => WWCD.indexPageCtrl(WWCD.injector));
  page('/f1', ()  => alert('f1'));
  page();

})(window.WWCD = (window.WWCD || {}));
