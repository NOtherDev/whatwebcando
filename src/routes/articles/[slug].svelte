<script context="module">
  import 'prismjs/themes/prism.css'

  const noOfMatchingTags = (current) => (candidate) => {
    return current.tags.filter((v) => candidate.tags.includes(v)).length
  }

  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    try {
      const currArticleResponse = await this.fetch(`/articles/${params.slug}.json`)

      if (!currArticleResponse.ok) {
        throw currArticleResponse
      }

      const currArticle = await currArticleResponse.json()

      const allArticlesResponse = await this.fetch(`/articles.json`)
      const allArticles = await allArticlesResponse.json()
      const noOfMatchingTagsWithCurrent = noOfMatchingTags(currArticle)

      const otherArticles = allArticles
        .filter((a) => a.slug !== currArticle.slug)
        .sort((left, right) => {
          const leftMatchingTags = noOfMatchingTagsWithCurrent(left)
          const rightMatchingTags = noOfMatchingTagsWithCurrent(right)

          if (leftMatchingTags > rightMatchingTags) {
            return -1
          }
          if (leftMatchingTags < rightMatchingTags) {
            return 1
          }
          if (left.weight > right.weight) {
            return -1
          }
          if (left.weight < right.weight) {
            return 1
          }
          return 0
        })


      return {
        article: currArticle,
        otherArticles: otherArticles.slice(0, 3)
      };
    } catch (err) {
      if (err.status === 499) {
        this.error(`You're offline`, 'This content was not cached for offline use. Please return while connected to the network.')
      } else {
        this.error(err.status || '500', err.message || 'Unexpected error');
      }
    }
  }
</script>

<script>
  import Prism from 'prismjs';
  import {onMount} from 'svelte';

  import Meta from '../../components/Meta.svelte';
  import Article from '../../components/Article.svelte';

  export let article;
  export let otherArticles;

  if (process.browser) {
    onMount(() => {
      Prism.highlightAll({async: true});
    })
  }
</script>

<style type="text/scss">
  main {
    padding: 1em;
  }

  aside {
    padding-top: 2em;
    padding-bottom: 3em;
    background-color: var(--primary-background);

    h2 {
      margin: 1em;
      font-size: 1.125em;
      text-transform: uppercase;

      &:first-child {
        margin-top: 0;
      }
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

  .see-all {
    margin-top: 2em;
  }

  @media screen and (min-width: 768px) {
    .container {
      display: grid;
      grid-template-columns: calc(100% - 23em) 23em;
    }

    main {
      padding: 1em 3em;
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
  <Meta title={article.title} url="/articles/{article.slug}/" description={article.description} image={article.image} />
</svelte:head>

<div class="container">
  <main>
  <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li><a href="/">Features</a></li>
        <li><a href="/articles/">Articles</a></li>
        <li class="is-active"><a href="/articles/{article.slug}/" aria-current="page">{article.title}</a></li>
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

    {#each otherArticles as article}
      <Article article={article} />
    {/each}

    <p class="text-center see-all">
      <a href="/articles/" class="button">See all</a>
    </p>
  </aside>
</div>
