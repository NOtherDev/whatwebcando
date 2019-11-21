<script context="module">
  import features from '../data/features'
  import 'prismjs/themes/prism.css'

	export async function preload({ params }) {
	  const feature = features.find(x => x.id === params.feature)

		if (feature) {
			return { feature, fetch: this.fetch };
		} else {
			this.error(404, 'Feature not found');
		}
	}
</script>

<script>
  export let feature
  export let fetch

  import Prism from 'prismjs';
  import {onMount, onDestroy, afterUpdate} from 'svelte';

	import {CaniuseReportFetch} from "../utils/caniuse";
  import {cleanAndRunScript, runOneOffScript} from "../utils/demoUtils";

   const runTests = async () => {
      return Promise.all((feature.tests || []).map(async test => {
        const result = await test.result
        let bgClass = 'default';

        if (result.passed) {
          bgClass = result.prefix || !result.standard ? 'warning' : 'success';
        } else if (result.standard) {
          bgClass = 'danger';
        }

        let iconClass = result.passed ? 'mdi-navigation-check' : 'mdi-navigation-close';

        return {
          test,
          result,
          bgClass,
          iconClass
        }
      }));
    };

  if (process.browser) {
    onMount(() => {
      if (feature.api) {
        Prism.highlightAll();
      }

      if (feature.demo) {
        cleanAndRunScript(feature.demo.js)
      }
    })

    afterUpdate(async () => {
      if (feature.caniuseKey && (!feature.caniuseReport || feature.caniuseReport.feature !== feature.caniuseKey)) {
        const report = await new CaniuseReportFetch(feature).fetch()
        feature.caniuseReport = report
        report.initVisuals()
      }
    })
  }

  if (process.browser && feature.demo && feature.demo.jsOnExit) {
    onDestroy(() => {
        runOneOffScript(feature.demo.jsOnExit);
    });
  }

</script>

<style>

  dt code {
    word-wrap: break-word;
    white-space: pre-wrap;
    display: inline-block;
    width: 100%;
  }

  dt code.token.function {
    display: inline-block;
  }

  dd {
    margin-left: 40px;
  }

  .feature-test {
    padding: 15px;
    overflow: hidden;
    border-top: 1px solid #ccc;
  }

  .feature-test:last-child {
    border-bottom: 1px solid #ccc;
  }

  code {
    background: none;
  }

  #demo-placeholder {
    position: relative;
    background: #f5f2f0;
    background: repeating-linear-gradient(45deg, #f5f2f0, #f5f2f0 20px, var(--primary-background) 20px, var(--primary-background) 40px);
    padding: 10px;
    border: 1px solid #ccc;
  }

  .tabs {
    margin: 30px auto;
    padding: 0;
    position: relative;
    overflow: hidden;
    height: 350px;
  }

  .tab {
    float: left;
    display: block;
  }

  .tab > input[type="radio"] {
    position: absolute;
    left: -9999px;
  }

  .tab > label {
    display: block;
    padding: 6px 21px;
    border: 2px solid transparent;
    border-bottom: 0 !important;
    cursor: pointer;
    position: relative;
    color: #FFF;
    background: #009688;
  }

  .demo-code-tab {
    z-index: 0; /* or display: none; */
    width: 100%;
    height: calc(100% - 33px);
    padding: 15px;
    position: absolute;
    margin: 0;
    left: 0;

    opacity: 0;
    transition: opacity 400ms ease-out;
  }

  .tabs > .tab > [id^="demo-code"]:checked + label {
    top: 0;
    background: #fff;
    color: #009688;
    border: 2px solid #eee;
  }

  .tabs > .tab > [id^="demo-code"]:checked ~ [id^="demo-code-content"] {
    z-index: 1; /* or display: block; */

    opacity: 1;
    transition: opacity 400ms ease-out;
  }

</style>

<svelte:head>
	<title>What Web Can Do Today: {feature.name}</title>
</svelte:head>

<main class="page">
  <article>
    <h2>{feature.name}</h2>

    <section>
      {#each feature.description as description}
        <p>{@html description}</p>
      {/each}
    </section>

    {#if feature.api}
      <section>
        <h3>API glimpse</h3>
        <div class="api-glimpse language-javascript">{@html feature.api}</div>
      </section>
    {/if}

    {#if process.browser}
      {#await runTests() then tests}
        <section class="feature-tests" aria-hidden="true">
          <h3>Support in your browser</h3>
          <div>
            {#each tests as t}
              <div class="feature-test bg-{t.bgClass}">
                <div class="pull-left"><code>{t.test.containerName}.{t.result.prefix}{t.result.property}</code></div>
                <div class="pull-right"><i class="{t.test.iconClass}"></i> {t.result.message}</div>
              </div>
            {/each}
          </div>
        </section>
      {/await}
    {/if}

    {#if feature.demo}
      <section>
        <h3>Live Demo</h3>
        <div id="demo-placeholder">
          {@html `<style>
            ${feature.demo.css || ''}
            ${feature.demo.cssHidden || ''}
          </style>`}
          {@html feature.demo.html}
        </div>

        <ul class="tabs">
          {#if feature.demo.js}
            <li class="tab">
              <input type="radio" name="tabs" checked="checked" id="demo-code-js" />
              <label for="demo-code-js">JavaScript</label>
              <pre id="demo-code-content-js" class="demo-code-tab"><code class="language-javascript">{feature.demo.js}</code></pre>
            </li>
          {/if}
          <li class="tab">
            <input type="radio" name="tabs" checked={!feature.demo.js} id="demo-code-html" />
            <label for="demo-code-html">HTML</label>
            <pre id="demo-code-content-html" class="demo-code-tab"><code class="language-html">{feature.demo.html}</code></pre>
          </li>
          {#if feature.demo.css}
            <li class="tab">
              <input type="radio" name="tabs" id="demo-code-css" />
              <label for="demo-code-css">CSS</label>
              <pre id="demo-code-content-css" class="demo-code-tab"><code class="language-css">{feature.demo.css}</code></pre>
            </li>
          {/if}
        </ul>
      </section>
    {/if}

    {#if feature.caniuseKey}
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
              <li><i class="cl-support cl-support-partial"></i> Partial support, <a href="http://caniuse.com/#feat={feature.caniuseKey}" target="_blank">see details</a></li>
              <li><i class="cl-support cl-support-full"></i> Full support</li>
            </ul>
          </div>
          <p class="pull-right top-space">
            <a href="http://caniuse.com/#feat={feature.caniuseKey}" target="_blank">Data from caniuse.com</a>, <small>CC-BY 4.0 license</small>
          </p>
        </div>
      </section>
    {/if}

    {#if feature.links}
      <section>
        <h3>Resources</h3>
        <ul class="resources">
          {#each feature.links as link}
            <li><a href={link.url} target="_blank">{link.title}</a></li>
          {/each}
        </ul>
      </section>
    {/if}
  </article>

</main>
