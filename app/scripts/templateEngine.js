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
      this.$compileMemoized = _.memoize(this.$compile, (prefix, context) => `${prefix}-${JSON.stringify(context)}`);
    }

    $compile(prefix, context = {}) {
      let template = Handlebars.compile(this.templateFor(prefix).html());
      let compiled = new CompiledTemplate(template(context));
      compiled.bindRouter();
      return compiled.dom;
    }

    run(prefix, context = {}) {
      let newBodyClass = `page-${prefix}`;
      $('body').removeClass(this.$bodyClass).addClass(newBodyClass);
      this.$bodyClass = newBodyClass;

      return this.targetFor(prefix).html(this.$compileMemoized(prefix, context)).promise();
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
