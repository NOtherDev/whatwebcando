<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`/articles.json`)
		  .then(r => r.json())
		  .then(articles => {
        return { articles };
	  	});
	}
</script>

<script>
  import FeaturesList from '../components/FeaturesList.svelte';
  import Article from '../components/Article.svelte';

  export let articles;
</script>

<style>
  h2 {
    font-size: 1.125em;
    text-transform: uppercase;
  }

  main {
    background-color: var(--primary-background);
  }

  aside > p {
    margin-top: 2em;
  }
  aside > h2 {
    padding: 1em 1em 0;
  }

  @media screen and (min-width: 768px) {
    .container {
      display: grid;
      grid-template-columns: auto 50%;
    }
  }

  @media screen and (min-width: 1024px) {
    .container {
      grid-template-columns: auto 30%;
    }
  }
</style>

<svelte:head>
	<title>What Web Can Do Today</title>

	<meta property="og:title" content="What Web Can Do Today" />
  <meta property="og:description" content="Can I rely on the Web Platform features to build my app? An overview of the device integration HTML5 APIs." />
  <meta property="og:url" content="https://whatwebcando.today/" />
  <meta property="og:image" content="https://whatwebcando.today/images/share-image.png" />

  <meta name="twitter:title" content="What Web Can Do Today" />
  <meta name="twitter:description" content="Can I rely on the Web Platform features to build my app? An overview of the device integration HTML5 APIs." />
  <meta name="twitter:image" content="https://whatwebcando.today/images/share-image.png" />
</svelte:head>

<div class="container">
  <main>
    <h2>Features</h2>

    <FeaturesList/>
  </main>

  <aside>
    <h2>Articles</h2>

    {#each articles.slice(0, 3) as article}
      <Article article={article} />
    {/each}

    <p class="text-center">
      <a href="/articles" class="button">See all</a>
    </p>
  </aside>
</div>
