// jshint devel:true

(function (WWCD) {
  'use strict';

  let $defineMultiple = function (callback, config) {
    for (let key in config) {
      if (config.hasOwnProperty(key)) {
        callback(key, config[key]);
      }
    }
  };

  class Configurator {
    constructor(injector) {
      this.$injector = injector;
    }

    $define(name, getter) {
      Object.defineProperty(this.$injector, name, {
        readonly: true,
        enumerable: true,
        get: getter
      });
    }

    singleton(name, instance) {
      this.$define(name, () => instance);
      return this;
    }

    singletons(config) {
      $defineMultiple(this.singleton.bind(this), config);
      return this;
    }

    class(name, constructor) {
      this.$define(name, () => new constructor(this.$injector));
      return this;
    }

    classes(config) {
      $defineMultiple(this.class.bind(this), config);
      return this;
    }
  }

  class Container {
    constructor(configureCallback = undefined) {
      this.$injector = Object.create(null);

      if (configureCallback) {
        this.configure(configureCallback);
      }
    }

    configure(configureCallback) {
      configureCallback(new Configurator(this.$injector));
    }

    get injector() {
      return this.$injector;
    }

    resolveFunc(dependencyFunc, ...args) {
      return dependencyFunc(...args, this.injector);
    }
  }

  WWCD.container = new Container();

})(window.WWCD = (window.WWCD || {}));
