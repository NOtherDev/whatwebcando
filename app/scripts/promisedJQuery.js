// jshint devel:true

(function () {
  'use strict';

  let createOptions = function (durationOrOptions) {
    let options = durationOrOptions;
    if (typeof durationOrOptions !== 'object') {
      options = { duration: durationOrOptions || 'fast' };
    }
    return options;
  };

  $.fn.promisedSlideUp = function (durationOrOptions) {
    let options = createOptions(durationOrOptions);
    return new Promise((resolve, reject) => {
      options.complete = resolve;
      options.fail = reject;
      this.slideUp(options);
    });
  };

  $.fn.promisedSlideDown = function (durationOrOptions) {
    let options = createOptions(durationOrOptions);
    return new Promise((resolve, reject) => {
      options.complete = resolve;
      options.fail = reject;
      this.slideDown(options);
    });
  };

})();
