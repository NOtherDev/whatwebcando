<div class="col-sm-12">
  <div class="panel panel-primary feature-box">
    <div class="panel-heading">
      <a href="." aria-label="close" class="close-btn pull-right"><i class="mdi-navigation-close" aria-hidden="true"></i></a>
      <h2 class="panel-title">{{feature.name}}</h2>
    </div>
    <article class="panel-body">
      <section>
        {{#each feature.description}}
        <p>{{{.}}}</p>
        {{/each}}
      </section>

      {{#if feature.api}}
      <section>
        <h3>API glimpse</h3>
        <div class="api-glimpse language-javascript">{{{feature.api}}}</div>
      </section>
      {{/if}}

      <section class="hidden feature-tests" aria-hidden="true">
        <h3>Support in your browser</h3>
        <div id="tests-placeholder"></div>
      </section>

      {{#if feature.demo}}
      <section>
        <h3>Live Demo</h3>
        <div id="demo-placeholder">
          <style>
            {{{feature.demo.css}}}
            {{{feature.demo.cssHidden}}}
          </style>
          {{{feature.demo.html}}}
        </div>

        <ul class="tabs">
          {{#if feature.demo.js}}
          <li class="tab">
            <input type="radio" name="tabs" checked="checked" id="demo-code-js" />
            <label for="demo-code-js">JavaScript</label>
            <pre id="demo-code-content-js" class="demo-code-tab"><code class="language-javascript">{{feature.demo.js}}</code></pre>
          </li>
          {{/if}}
          <li class="tab">
            <input type="radio" name="tabs" {{#unless feature.demo.js}}checked="checked"{{/unless}} id="demo-code-html" />
            <label for="demo-code-html">HTML</label>
            <pre id="demo-code-content-html" class="demo-code-tab"><code class="language-html">{{feature.demo.html}}</code></pre>
          </li>
          {{#if feature.demo.css}}
          <li class="tab">
            <input type="radio" name="tabs" id="demo-code-css" />
            <label for="demo-code-css">CSS</label>
            <pre id="demo-code-content-css" class="demo-code-tab"><code class="language-css">{{feature.demo.css}}</code></pre>
          </li>
          {{/if}}
        </ul>
      </section>
      {{else}}
        <script>window.WWCD_initFeatureDemo = null</script>
      {{/if}}

      {{#if feature.caniuseKey}}
      <section aria-hidden="true">
        <h3>Browser support</h3>
        <div class="caniuse-report clearfix">
          <div class="row">
            <div class="ct-chart browsers-chart col-sm-6"></div>
            <div class="ct-chart overall-chart col-sm-6"></div>
          </div>
          <div class="pull-left top-space legend">
            <ul>
              <li><i class="cl-support cl-support-no"></i> No support</li>
              <li><i class="cl-support cl-support-partial"></i> Partial support, <a href="http://caniuse.com/#feat={{feature.caniuseKey}}" target="_blank">see details</a></li>
              <li><i class="cl-support cl-support-full"></i> Full support</li>
            </ul>
          </div>
          <p class="pull-right top-space">
            <a href="http://caniuse.com/#feat={{feature.caniuseKey}}" target="_blank">Data from caniuse.com</a>, <small>CC-BY 4.0 license</small>
          </p>
        </div>
      </section>
      {{/if}}

      {{#if feature.links}}
      <section>
        <h3>Resources</h3>
        <ul class="resources">
          {{#each feature.links}}
          <li><a href="{{url}}" target="_blank">{{title}}</a></li>
          {{/each}}
        </ul>
      </section>
      {{/if}}
    </article>
  </div>
</div>
