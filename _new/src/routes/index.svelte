<script>
  import FeaturesList from '../components/FeaturesList.svelte';
  import ArticlesList from '../components/ArticlesList.svelte';
</script>

<style>
  h2 {
    font-size: 1.125em;
    text-transform: uppercase;
  }

  main {
    background-color: #F8F8F8;
  }

  aside > p {
    margin-top: 2em;
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
</svelte:head>

<div class="container">
  <main>
    <h2>Features</h2>

    <FeaturesList/>
  </main>

  <aside>
    <h2>Articles</h2>

    <ArticlesList/>

    <p class="text-center">
      <a href="/articles" class="button">See all</a>
    </p>
  </aside>
</div>
