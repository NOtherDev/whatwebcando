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
    run(templatePrefix, context = {}) {
      let template = Handlebars.compile($(`\#${templatePrefix}-template`).html());
      let compiled = new CompiledTemplate(template(context));
      compiled.bindRouter();
      $(`\#${templatePrefix}-target`).html(compiled.dom);
    }
  }

  container.configure(register => register.class('templateEngine', TemplateEngine));

})(WWCD.container);
