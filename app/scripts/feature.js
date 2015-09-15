// jshint devel:true

(function (global) {
  'use strict';

  class Feature {
    constructor({ id, name, supported = undefined, icon = undefined, urls = [], caniuse = undefined }) {
      this.id = id;
      this.name = name;
      this.caniuseKey = caniuse;
      this.supported = supported;
      this.icon = icon;
      this.urls = urls.map(u => {
        // TODO temporary hack until the features data is cleaned up
        if (typeof u === 'string') {
          return {url: u, title: u};
        }
        return u;
      });
    }

    get notSupported() {
      return this.supported === false;
    }

    appendLinks(links = []) {
      this.urls = this.urls.concat(links);
    }
  }

  let capitalizeFirst = str => str.substr(0, 1).toUpperCase() + str.substr(1);

  Feature.containedIn = function (container, property) {
    if (!container || !(property in container)) {
      return false;
    }

    if (property in container) {
      return true;
    }

    let capitalizedProperty = capitalizeFirst(property);
    for (let prefix of ['moz', 'webkit', 'ms']) {
      if (prefix + property in container || prefix + capitalizedProperty in container) {
        return true;
      }
    }

    return false;
  };

  Feature.navigatorContains = property => Feature.containedIn(global.navigator, property);
  Feature.windowContains = property => Feature.containedIn(global, property);

  global.WWCD.Feature = Feature;

})(function () {
  let global = typeof exports === 'object' ? exports : window;
  global.WWCD = global.WWCD || {};
  return global;
}());
