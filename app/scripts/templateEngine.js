// jshint devel:true

(function (container) {
  'use strict';

  class CompiledTemplate {
    constructor(compiled) {
      this.$compiled = compiled;
    }

    bindRouter() {
      $(this.$compiled).find('*[bind-router]').click(event => {
        event.preventDefault();
        event.stopPropagation();
        page(this.getAttribute('href'));
      });
    }

    get dom() {
      return this.$compiled;
    }
  }

  class TemplateEngine {
    constructor() {
      this.$runOnceMemoized = _.memoize(this.$runOnce, (prefix, context) => `${prefix}-${JSON.stringify(context)}`);
    }

    $runOnce(prefix, context = {}) {
      let template = Handlebars.compile(this.templateFor(prefix).html());
      let compiled = new CompiledTemplate(template(context));
      compiled.bindRouter();
      this.targetFor(prefix).html(compiled.dom);
    }

    run(prefix, context = {}) {
      return this.$runOnceMemoized(prefix, context);
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
