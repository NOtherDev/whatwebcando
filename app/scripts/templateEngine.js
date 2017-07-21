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
      let template = Handlebars.templates[`build/${prefix}.html.hb`];
      let compiled = new CompiledTemplate(template(context));
      return compiled.dom;
    }

    annotateBody(prefix) {
      let newBodyClass = `page-${prefix}`;
      let $body = document.querySelector('body');
      $body.className = $body.className.replace(this.$bodyClass, newBodyClass);
      this.$bodyClass = newBodyClass;
    }

    run(prefix, context = {}) {
      this.annotateBody(prefix);
      this.targetElementFor(prefix).innerHTML = this.$compileMemoized(prefix, context);
    }

    templateFor(prefix) {
      if (!this.$cache[prefix]) {
        this.$cache[prefix] = this.templateElementFor(prefix).cloneNode(true);
      }
      return this.$cache[prefix];
    }

    templateElementFor(prefix) {
      return document.querySelector(`\.${prefix}-template`);
    }

    targetElementFor(prefix) {
      return document.querySelector(`\.${prefix}-target`);
    }
  }

  container.configure(register => register.singleton('templateEngine', new TemplateEngine()));

})(WWCD.container);
