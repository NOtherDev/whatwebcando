<script context="module">
  import _ from 'lodash'

  export async function preload({ params, query }) {
    const response = await this.fetch(`/articles.json`)
    const articles = await response.json()
    return {
      articles: _(articles)
        .orderBy(['weight'], ['desc'])
        .value()
    };
  }
</script>

<script>
  import Article from '../../components/Article.svelte'
  import Meta from '../../components/Meta.svelte';

	export let articles;
</script>

<style type="text/scss">
  .page {
    padding: 1em;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 -1em;

    &:after {
      content: "";
      flex: 100 0 18em;
    }
  }
</style>

<svelte:head>
	<Meta title="Articles" url="articles" />
</svelte:head>

<main class="page">
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li><a href="/">Features</a></li>
      <li class="is-active"><a href="/articles" aria-current="page">Articles</a></li>
    </ul>
  </nav>

  <div class="list">
    {#each articles as article}
      <Article article={article} />
    {/each}
  </div>
</main>
