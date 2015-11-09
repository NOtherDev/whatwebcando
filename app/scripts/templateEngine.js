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
      return this.targetElementFor(prefix).html(this.$compileMemoized(prefix, context)).promise();
    }

    templateFor(prefix) {
      if (!this.$cache[prefix]) {
        this.$cache[prefix] = this.templateElementFor(prefix).clone();
      }
      return this.$cache[prefix];
    }

    templateElementFor(prefix) {
      return $(`\.${prefix}-template`);
    }

    targetElementFor(prefix) {
      return $(`\.${prefix}-target`);
    }
  }

  container.configure(register => register.singleton('templateEngine', new TemplateEngine()));

})(WWCD.container);
