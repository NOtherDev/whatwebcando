<div class="col-sm-12">
  <div class="panel panel-primary feature-box">
    <div class="panel-heading">
      <a href="."><i class="pull-right mdi-navigation-close"></i></a>
      <h3 class="panel-title">{{feature.name}}</h3>
    </div>
    <div class="panel-body">
      {{#each feature.description}}
      <p>{{{.}}}</p>
      {{/each}}

      {{#if feature.api}}
      <h3>API glimpse</h3>
      <div class="api-glimpse language-javascript">{{{feature.api}}}</div>
      {{/if}}

      <div class="hidden feature-tests">
        <h3>Support in your browser</h3>
        <div id="tests-placeholder"></div>
      </div>

      {{#if feature.demoPen}}
      <h3>Live Demo</h3>
      <p data-height="275" data-theme-id="19170" data-slug-hash="{{feature.demoPen}}" data-default-tab="result" data-user="WhatWebCanDo" class="codepen">
        See the Pen <a href="http://codepen.io/WhatWebCanDo/pen/{{feature.demoPen}}/">{{feature.demoPen}}</a>
        by WhatWebCanDo (<a href="http://codepen.io/WhatWebCanDo">@WhatWebCanDo</a>) on <a href="http://codepen.io">CodePen</a>.
      </p>
      {{/if}}

      {{#if feature.caniuseReport}}
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
      {{/if}}

      {{#if feature.links}}
      <h3>Resources</h3>
      <ul class="resources">
        {{#each feature.links}}
        <li><a href="{{url}}" target="_blank">{{title}}</a></li>
        {{/each}}
      </ul>
      {{/if}}
    </div>
  </div>
</div>
