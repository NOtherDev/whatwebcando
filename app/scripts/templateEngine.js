// jshint devel:true

(function (container) {
  'use strict';

  class CompiledTemplate {
    constructor(compiled) {
      this.$compiled = compiled;
    }

    get dom() {
      return this.$compiled;
    }
  }

  class TemplateEngine {
    constructor() {
      this.$cache = {};
      this.$compileMemoized = memoize(this.$compile);
    }

    static $memoizeKey(prefix, context) {
      return JSON.stringify(arguments);
    }

    $compile(prefix, context = {}) {
      let template = Handlebars.compile(this.templateFor(prefix).html());
      let compiled = new CompiledTemplate(template(context));
      return compiled.dom;
    }

    annotateBody(prefix) {
      let newBodyClass = `page-${prefix}`;
      $('body').removeClass(this.$bodyClass).addClass(newBodyClass);
      this.$bodyClass = newBodyClass;
    }

    run(prefix, context = {}) {
      this.annotateBody(prefix);
      return this.elementFor(prefix).html(this.$compileMemoized(prefix, context)).promise();
    }

    runOnce(prefix, context = {}) {
      if (TemplateEngine.$memoizeKey(prefix, context) in this.$compileMemoized.__cache) {
        return this.annotateBody(prefix);
      }

      return this.run(prefix, context);
    }

    templateFor(prefix) {
      if (!this.$cache[prefix]) {
        this.$cache[prefix] = this.elementFor(prefix).clone();
      }
      return this.$cache[prefix];
    }

    elementFor(prefix) {
      return $(`\.${prefix}-template`);
    }
  }

  container.configure(register => register.singleton('templateEngine', new TemplateEngine()));

})(WWCD.container);
