<script context="module">
  import 'prismjs/themes/prism.css'

	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`articles/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
		  const allArticlesResponse = await this.fetch(`/articles.json`)
      const allArticles = await allArticlesResponse.json() // TODO filter based on tags

			return { article: data, allArticles };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
  import Prism from 'prismjs';
  import {onMount} from 'svelte';

  import Meta from '../../components/Meta.svelte';
  import Article from '../../components/Article.svelte';

	export let article;
	export let allArticles;

	if (process.browser) {
	  onMount(() => {
      Prism.highlightAll();
    })
	}
</script>

<style type="text/scss">
  main {
    padding: 1em;
  }

  aside {
    padding-bottom: 3em;
    background-color: var(--primary-background);

    h2 {
      padding: 2em 1em;
      font-size: 1.125em;
      text-transform: uppercase;
    }
  }

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
      max-width: 15em;
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

  @media screen and (min-width: 768px) {
    .container {
      display: grid;
      grid-template-columns: calc(100% - 20em) 20em;
    }
  }

  @media screen and (min-width: 1024px) {
    .content {
      :global(img) {
        max-width: 30em;
      }
    }
  }
</style>

<svelte:head>
	<Meta title={article.title} url="articles/{article.slug}" description={article.description} image={article.image} />
</svelte:head>

<div class="page">
  <div class="container">
    <main>
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

    <aside>
      <h2>See also</h2>

      {#each allArticles.slice(0, 3) as article}
        <Article article={article} />
      {/each}

      <p class="text-center">
        <a href="/articles" class="button">See all</a>
      </p>
    </aside>
  </div>
</div>
