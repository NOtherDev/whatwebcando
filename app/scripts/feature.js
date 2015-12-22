(function (global) {
  'use strict';

  class FeatureTestResult {
    constructor(passed, property, prefix = '') {
      this.passed = passed;
      this.property = property;
      this.prefix = prefix;
    }

    get message() {
      return this.passed ? (this.prefix ? 'Prefixed' : 'Supported') : 'Not supported';
    }

    static forPassed(property, prefix) {
      return new FeatureTestResult(true, property, prefix);
    }
    static forFailed(property) {
      return new FeatureTestResult(false, property);
    }
  }

  class FeatureTest {
    constructor(containerName, container, property) {
      this.containerName = containerName;
      this.property = property;

      Object.defineProperties(this, {
        $container: {
          value: container,
          enumerable: false
        }
      });
    }

    $capitalizeFirst(str) {
      return str.substr(0, 1).toUpperCase() + str.substr(1);
    }

    get result() {
      let container = this.$container;
      let property = this.property;

      if (!container) {
        return FeatureTestResult.forFailed(property);
      }

      if (property in container) {
        return FeatureTestResult.forPassed(property);
      }

      let capitalizedProperty = this.$capitalizeFirst(property);
      for (let prefix of ['moz', 'webkit', 'ms']) {
        if (prefix + property in container) {
          return FeatureTestResult.forPassed(property, prefix);
        }
        if (prefix + capitalizedProperty in container) {
          return FeatureTestResult.forPassed(capitalizedProperty, prefix);
        }
        let capitalizedPrefix = this.$capitalizeFirst(prefix);
        if (capitalizedPrefix + capitalizedProperty in container) {
          return FeatureTestResult.forPassed(capitalizedProperty, capitalizedPrefix);
        }
      }

      return FeatureTestResult.forFailed(property);
    }
  }

  class Feature {
    constructor({ id, name, description = [], api = undefined, tests = [], icon = undefined, demoPen = undefined, links = [], caniuse = undefined }) {
      this.id = id;
      this.name = name;
      this.description = typeof description === 'string' ? [description] : description;
      this.api = api;
      this.caniuseKey = caniuse;
      this.tests = tests;
      this.icon = icon;
      this.demoPen = demoPen;
      this.links = links;
    }

    get supported() {
      if (!this.tests.length) {
        return undefined;
      }

      return !!this.tests.find(x => x.result.passed);
    }

    get notSupported() {
      return this.supported === false;
    }
  }

  Feature.containedIn = function (containerName, container, property) {
    return new FeatureTest(containerName, container, property);
  };

  Feature.navigatorContains = property => Feature.containedIn('navigator', global.navigator, property);
  Feature.windowContains = property => Feature.containedIn('window', global, property);

  global.WWCD.Feature = Feature;

})(function () {
  let global = typeof exports === 'object' ? exports : window;
  global.WWCD = global.WWCD || {};
  return global;
}());
