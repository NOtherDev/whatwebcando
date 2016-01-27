<div class="col-sm-12">
  <div class="panel panel-primary feature-box">
    <div class="panel-heading">
      <a href="." aria-label="close"><i class="pull-right mdi-navigation-close" aria-hidden="true"></i></a>
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

      <section class="hidden feature-tests">
        <h3>Support in your browser</h3>
        <div id="tests-placeholder"></div>
      </section>

      {{#if feature.demoPen}}
      <section>
        <h3>Live Demo</h3>
        <p data-height="275" data-theme-id="19170" data-slug-hash="{{feature.demoPen}}" data-default-tab="result" data-user="WhatWebCanDo" class="codepen">
          See the Pen <a href="http://codepen.io/WhatWebCanDo/pen/{{feature.demoPen}}/">{{feature.demoPen}}</a>
          by WhatWebCanDo (<a href="http://codepen.io/WhatWebCanDo">@WhatWebCanDo</a>) on <a href="http://codepen.io">CodePen</a>.
        </p>
      </section>
      {{/if}}

      {{#if feature.caniuseReport}}
      <section>
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
