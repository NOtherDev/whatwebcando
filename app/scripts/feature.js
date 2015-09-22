// jshint devel:true

(function (global) {
  'use strict';

  class Feature {
    constructor({ id, name, description = '', supported = undefined, icon = undefined, demoPen = undefined, links = [], caniuse = undefined }) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.caniuseKey = caniuse;
      this.supported = supported;
      this.icon = icon;
      this.demoPen = demoPen;
      this.$links = _.indexBy(links, 'url');
    }

    get links() {
      return _.filter(this.$links, l => l.ignore !== true);
    }

    get notSupported() {
      return this.supported === false;
    }

    appendLinks(links = []) {
      this.$links = _.assign(_.indexBy(links, 'url'), this.$links);
    }
  }

  let capitalizeFirst = str => str.substr(0, 1).toUpperCase() + str.substr(1);

  Feature.containedIn = function (container, property) {
    if (!container) {
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
