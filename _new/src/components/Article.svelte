<script>
	export let article;
</script>

<style type="text/scss">
  .article {
    min-width: 18em;
    flex: 1 0 18em;
    margin: 1em;
    border: 1px solid var(--primary-border);
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;

    h3 {
      margin-top: 0;
    }

    img {
      width: 100%;
    }

    a:not(.button) {
      color: unset;
    }

    a:hover {
      text-decoration: none;

      h3 {
        text-decoration: underline;
      }
    }

    figcaption, .description {
      padding: 1em;
    }

    figcaption {
      background: var(--primary-background);
    }
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
