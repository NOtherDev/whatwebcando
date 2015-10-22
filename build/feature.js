'use strict';

var noop = function () {};
var Feature = function (feature) {
  this.id = feature.id;
};

Feature.containedIn = noop;
Feature.navigatorContains = noop;
Feature.windowContains = noop;

module.exports = Feature;
