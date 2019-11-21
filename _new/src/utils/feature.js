class FeatureTestResult {
  constructor(passed, property, standard = true, prefix = '') {
    this.passed = passed;
    this.property = property;
    this.standard = standard;
    this.prefix = prefix;
  }

  get message() {
    if (!this.standard) {
      return this.passed ? 'Supported with non-standard solution' : 'Non-standard solution not supported';
    }
    if (!this.passed) {
      return 'Not supported';
    }
    return this.prefix ? 'Prefixed' : 'Supported';
  }

  static forPassed(property, standard, prefix) {
    return Promise.resolve(new FeatureTestResult(true, property, standard, prefix));
  }

  static forFailed(property, standard) {
    return Promise.resolve(new FeatureTestResult(false, property, standard));
  }
}

class FeatureRawTest {
  constructor(containerName, property, test, standard = true) {
    this.containerName = containerName;
    this.property = property;
    this.test = test;
    this.standard = standard;
  }

  get result() {
    return (this.test() ? FeatureTestResult.forPassed : FeatureTestResult.forFailed)(this.property, this.standard);
  }
}

class FeatureInContainerTest {
  constructor(containerName, container, property, standard = true) {
    this.containerName = containerName;
    this.property = property;
    this.standard = standard;

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
      return FeatureTestResult.forFailed(property, this.standard);
    }

    if (property in container) {
      return FeatureTestResult.forPassed(property, this.standard);
    }

    let capitalizedProperty = this.$capitalizeFirst(property);
    for (let prefix of ['moz', 'webkit', 'ms']) {
      if (prefix + property in container) {
        return FeatureTestResult.forPassed(property, this.standard, prefix);
      }
      if (prefix + capitalizedProperty in container) {
        return FeatureTestResult.forPassed(capitalizedProperty, this.standard, prefix);
      }
      let capitalizedPrefix = this.$capitalizeFirst(prefix);
      if (capitalizedPrefix + capitalizedProperty in container) {
        return FeatureTestResult.forPassed(capitalizedProperty, this.standard, capitalizedPrefix);
      }
    }

    return FeatureTestResult.forFailed(property, this.standard);
  }
}

class FeatureAsyncTest {
  constructor(containerName, property, test, standard = true) {
    this.containerName = containerName;
    this.property = property;
    this.test = test;
    this.standard = standard;
  }

  get result() {
    return this.test()
      .then(result => (result ? FeatureTestResult.forPassed : FeatureTestResult.forFailed)(this.property, this.standard));
  }
}

export class Feature {
  constructor(feature) {
    this.id = feature.id;
    this.aliases = feature.aliases || [];
    this.name = feature.name;
    this.description = (typeof feature.description === 'string' ? [feature.description] : feature.description) || [];
    this.api = feature.api;
    this.caniuseKey = feature.caniuse;
    this.tests = feature.tests || [];
    this.demo = feature.demo;
    this.demoPen = feature.demoPen;
    this.links = feature.links || [];
  }

  async determineIsSupported() {
    if (!this.tests.length) {
      throw 'no tests'
    }

    const results = await Promise.all(this.tests.map(t => t.result))
    return !!results.find(r => r.passed)
  }

  static containedIn(containerName, container, property, standard) {
    return new FeatureInContainerTest(containerName, container, property, standard);
  }

  static navigatorContains(property, standard) {
    return Feature.containedIn('navigator', typeof(window) !== 'undefined' && window.navigator, property, standard);
  }

  static documentContains(property, standard) {
    return Feature.containedIn('document', typeof(window) !== 'undefined' && window.document, property, standard);
  }

  static windowContains(property, standard) {
    return Feature.containedIn('window', typeof(window) !== 'undefined' && window, property, standard);
  }

  static serviceWorkerRegistrationContains(property, standard) {
    return Feature.containedIn('ServiceWorkerRegistration',
      typeof(window) !== 'undefined' && window.ServiceWorkerRegistration && window.ServiceWorkerRegistration.prototype, property, standard);
  }

  static rawTest(containerName, property, test) {
    return new FeatureRawTest(containerName, property, test);
  }

  static asyncRawTest(containerName, property, test) {
    return new FeatureAsyncTest(containerName, property, test);
  }
}
