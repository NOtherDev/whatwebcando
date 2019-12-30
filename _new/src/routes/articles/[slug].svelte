<script context="module">
  import 'prismjs/themes/prism.css'

	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`articles/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { article: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
  import Prism from 'prismjs';
  import {onMount} from 'svelte';

  import Meta from '../../components/Meta.svelte';

	export let article;

	if (process.browser) {
	  onMount(() => {
      Prism.highlightAll();
    })
	}
</script>

<style type="text/scss">
	.content {
	  line-height: 1.5;

    :global(h2) {
      font-size: 1.4em;
      font-weight: 500;
    }

    :global(pre),
    :global(figure) {
      border: 1px solid var(--primary-border);
      border-radius: 4px;
      background-color: var(--primary-background);
      padding: 0.5em;
    }

    :global(pre) {
      overflow-x: auto;

      :global(code) {
        background-color: transparent;
        padding: 0;
      }
    }

    :global(li) {
      margin: 0 0 0.5em 0;
    }

	  :global(img) {
      max-width: 30rem;
      float: right;
      margin: 1em 0 1em 1em;
    }

    :global(figure) {
      text-align: center;

      :global(img) {
        float: none;
        margin: 0;
      }
    }
  }

  .author {
    margin-top: 2em;
    border: 1px solid var(--primary-border);
    border-radius: 4px;
    background-color: var(--primary-background);
    text-align: right;

    :global(p) {
      margin: 1em;
    }
  }
</style>

<svelte:head>
	<Meta title={article.title} url="articles/{article.slug}" description={article.description} image={article.image} />
</svelte:head>

<main class="page">
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li><a href="/">Features</a></li>
      <li><a href="/articles">Articles</a></li>
      <li class="is-active"><a href="/articles/{article.slug}" aria-current="page">{article.title}</a></li>
    </ul>
  </nav>

  <h1>{article.title}</h1>

  <div class="content language-javascript">
    {@html article.html}
  </div>

  <div class="author">{@html article.author}</div>
</main>
