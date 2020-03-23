<script context="module">
  import features from '../data/features'
  import 'prismjs/themes/prism.css'

	export async function preload({ params }) {
	  const feature = features.find(x => x.id === params.feature)
		if (feature) {
			return {feature};
		}

		const aliased = features.find(x => x.aliases.includes(params.feature))
		if (aliased) {
		  this.redirect(301, `/${aliased.id}.html`);
		} else {
			this.error(404, 'Feature not found');
		}
	}
</script>

<script>
  export let feature

  import Meta from '../components/Meta.svelte'

  import Prism from 'prismjs';
  import {onMount, onDestroy, afterUpdate} from 'svelte';

  import {CaniuseReportFetch} from "../utils/caniuse";
  import {runOneOffScript} from "../utils/demoUtils";

  const runTests = async (tests) => {
    return Promise.all((tests || []).map(async test => {
      const result = await test.result
      let bgClass = 'default';

      if (result.passed) {
        bgClass = result.prefix || !result.standard ? 'warning' : 'success';
      } else if (result.standard) {
        bgClass = 'danger';
      }

      return {
        test,
        result,
        bgClass,
      }
    }));
  };

  if (process.browser) {
    const initVisuals = () => {
      if (feature && feature.api) {
        Prism.highlightAll({async: true});
      }

      if (feature && feature.demo) {
        const jsDemo = document.querySelector('#demo-code-content-js .language-javascript')
        if (jsDemo) {
          jsDemo.innerHTML = feature.demo.js
          Prism.highlightElement(jsDemo)
        }

        const htmlDemo = document.querySelector('#demo-code-content-html .language-html')
        if (htmlDemo) {
          htmlDemo.innerHTML = feature.demo.html.replace(/</g, '&lt;')
          Prism.highlightElement(htmlDemo)
        }

        const cssDemo = document.querySelector('#demo-code-content-css .language-css')
        if (cssDemo) {
          cssDemo.innerHTML = feature.demo.css
          Prism.highlightElement(cssDemo)
        }

        runOneOffScript(feature.demo.js)
      }
    }

    onMount(initVisuals)

    afterUpdate(async () => {
      initVisuals()

      if (feature && feature.caniuseKey) {
        if (!feature.caniuseReport || feature.caniuseReport.feature !== feature.caniuseKey) {
          const report = await new CaniuseReportFetch(feature).fetch()
          feature.caniuseReport = report
        }
        feature.caniuseReport.initVisuals()
      }
    })
  }

  if (process.browser) {
    onDestroy(() => {
      if (feature && feature.demo && feature.demo.jsOnExit) {
        runOneOffScript(feature.demo.jsOnExit);
      }
    });
  }

</script>

<style type="text/scss">

  .page {
    padding: 1em;
  }

  .feature-test {
    padding: 15px;
    overflow: hidden;
    border-top: 1px solid #ccc;

    * {
      max-width: 100%;
    }

    &:last-child {
      border-bottom: 1px solid #ccc;
    }
  }

  .demo-placeholder {
    position: relative;
    padding: 10px;
    border: 1px solid #ccc;
    overflow-x: auto;
    background: #f5f2f0;
    background: repeating-linear-gradient(45deg, #f5f2f0, #f5f2f0 20px, var(--primary-background) 20px, var(--primary-background) 40px);

    :global(button),
    :global(input[type=text]),
    :global(input[type=number]),
    :global(input[type=password]),
    :global(textarea) {
      border-radius: 4px;
      font-family: inherit;
      font-size: 1rem;
      line-height: 1.5;
    }

    :global(input[type=text]),
    :global(input[type=number]),
    :global(input[type=password]),
    :global(textarea) {
      border: 1px solid rgb(219, 219, 219);
      padding: .5rem .75rem;
    }

    :global(button) {
      padding: .25rem .5rem;
      white-space: nowrap;
      cursor: pointer;

      &:hover {
        background: var(--primary-background);
      }
    }

    :global(input[type=text]) {
      margin: 0;
      max-width: 100%;
    }

    :global(textarea) {
      width: 100%;
      box-sizing: border-box;
    }

    :global(.badge) {
      color: #fff;
      background: var(--primary-color);
      border-radius: 8px;
      display: inline-flex;
      font-size: .75rem;
      padding-left: .5rem;
      padding-right: .5rem;
    }

    :global(label) {
      font-weight: bold;
    }

    :global(p) {
      margin: 1rem 0;
    }

    :global(table) {
      border-collapse: collapse;
      line-height:1.5;
      margin-bottom: 1.5rem;
      width: 100%;

      :global(td) {
         border: 1px solid rgb(219, 219, 219);
         padding: .25rem .5rem;
      }

      :global(tr):nth-child(2n+1) :global(td) {
        background-color: #fff;
      }
    }

    :global(pre) {
      white-space: normal;
    }
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

    & > input[type="radio"] {
      position: absolute;
      left: -9999px;
    }

    & > label {
      display: block;
      padding: 6px 21px;
      border: 2px solid transparent;
      border-bottom: 0 !important;
      cursor: pointer;
      position: relative;
      color: #FFF;
      background: var(--primary-color);
    }
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
    color: var(--primary-color);
    border: 2px solid #eee;
  }

  .tabs > .tab > [id^="demo-code"]:checked ~ [id^="demo-code-content"] {
    z-index: 1; /* or display: block; */

    opacity: 1;
  }

  .legend {
    text-align: center;

    ul {
      list-style: none;
      padding: 0;
      margin-bottom: 15px;
    }

    li {
      display: inline-block;
      margin: 0 10px;
    }
  }

  @media screen and (min-width: 768px) {
    .row {
      display: flex;
      align-items: center;

      & > * {
        width: 50%;
      }
    }

    .demo-placeholder {
      :global(.columns) {
        display: flex;
        justify-content: space-evenly;
      }
    }
  }

</style>

<svelte:head>
  <Meta title={feature.name} url="{feature.id}.html" />
</svelte:head>

<main class="page">
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li><a href="/">Features</a></li>
      <li class="is-active"><a href="/{feature.id}.html" aria-current="page">{feature.name}</a></li>
    </ul>
  </nav>

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
      {#await runTests(feature.tests) then tests}
        <section class="feature-tests" aria-hidden="true">
          <h3>Support in your browser</h3>
          <div>
            {#each tests as t}
              <div class="feature-test bg-{t.bgClass}">
                <div class="pull-left"><code>{t.test.containerName}&#8203;.{t.result.prefix}{t.result.property}</code></div>
                <div class="pull-right">️{t.result.message}</div>
              </div>
            {/each}
          </div>
        </section>
      {/await}
    {/if}

    {#if feature.demo}
      <section>
        <h3>Live Demo</h3>
        <div class="demo-placeholder">
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
        <div class="caniuse-report">
          <div class="row">
            <div class="ct-chart browsers-chart col-sm-6"></div>
            <div class="ct-chart overall-chart col-sm-6"></div>
          </div>
          <div class="row">
            <div class="legend">
              <ul>
                <li><i class="cl-support cl-support-no"></i> No support</li>
                <li><i class="cl-support cl-support-partial"></i> Partial support, <a href="http://caniuse.com/#feat={feature.caniuseKey}" target="_blank" rel="noopener">see details</a></li>
                <li><i class="cl-support cl-support-full"></i> Full support</li>
              </ul>
            </div>
            <div class="text-right">
              <a href="http://caniuse.com/#feat={feature.caniuseKey}" target="_blank" rel="noopener">Data from caniuse.com</a>, <small>CC-BY 4.0 license</small>
            </div>
          </div>
        </div>
      </section>
    {/if}

    {#if feature.links}
      <section>
        <h3>Resources</h3>
        <ul class="resources">
          {#each feature.links as link}
            <li><a href={link.url} target="_blank" rel="noopener">{link.title}</a></li>
          {/each}
        </ul>
      </section>
    {/if}
  </article>

</main>
