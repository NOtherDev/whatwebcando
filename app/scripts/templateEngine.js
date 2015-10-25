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
      this.$compileMemoized = _.memoize(this.$compile, TemplateEngine.$memoizeKey);
    }

    static $memoizeKey(prefix, context) {
      return `${prefix}-${JSON.stringify(context)}`
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
      return this.targetFor(prefix).html(this.$compileMemoized(prefix, context)).promise();
    }

    runOnce(prefix, context = {}) {
      if (this.$compileMemoized.cache.has(TemplateEngine.$memoizeKey(prefix, context))) {
        return this.annotateBody(prefix);
      }

      return this.run(prefix, context);
    }

    templateFor(prefix) {
      return $(`\#${prefix}-template`);
    }

    targetFor(prefix) {
      return $(`\#${prefix}-target`);
    }
  }

  container.configure(register => register.singleton('templateEngine', new TemplateEngine()));

})(WWCD.container);
