<script>
	export let article;
</script>

<style type="text/scss">
  .article {
    min-width: 18rem;
    flex: 1 0 18rem;
    margin: 1em;
    border: 1px solid var(--primary-border);
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
  }

  a:not(.button) {
    color: unset;
  }
  a:hover {
    text-decoration: none;
  }
  a:hover h3 {
    text-decoration: underline;
  }

  img {
    width: 100%;
  }

  figcaption, .description {
    padding: 1em;
  }

  figcaption {
    background: var(--primary-background);
  }
</style>

<div class="article">
  <a rel='prefetch' href="/articles/{article.slug}">
    <figure>
      <img alt="{article.title}" src="{article.image}"/>
      <figcaption>{article.tags.join(', ')}</figcaption>
    </figure>

    <div class="description">
      <h3>{article.title}</h3>

      <p>{article.description}</p>
    </div>
  </a>
</div>
