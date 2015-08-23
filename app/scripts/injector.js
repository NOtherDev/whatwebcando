// jshint devel:true

(function (WWCD) {
  'use strict';

  let templateEngine = {
    run(templatePrefix, context = {}) {
      let template = Handlebars.compile($(`\#${templatePrefix}-template`).html());
      $(`\#${templatePrefix}-target`).html(template(context));
    }
  };

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

    factory(name, func, ...rest) {
      this.$define(name, () => func(...rest, this.$injector));
      return this;
    }

    factories(config) {
      $defineMultiple(this.factory.bind(this), config);
      return this;
    }

    transientInstance(name, constructor, ...rest) {
      this.$define(name, () => new constructor(...rest, this.$injector));
      return this;
    }

    transientInstances(config) {
      $defineMultiple(this.transientInstance.bind(this), config);
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
  }

  let container = new Container(register => register.singletons({
    templateEngine: templateEngine,
    featuresGroups: WWCD.featuresGroups
  }));

  WWCD.injector = container.injector;

})(window.WWCD = (window.WWCD || {}));
