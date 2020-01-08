<script>
	export let segment;
</script>

<style>
  header {
    background: #505050 url(/headerbg.jpg);
    background-size: cover;
    text-shadow: 0 0 3px #000;
  }

  header, a {
    color: #fff !important;
  }

  ul {
    margin: 0 auto;
    padding: 1em;
    max-width: 400px;
    display: flex;
    justify-content: space-around;
  }

  li {
		display: block;
	}

  a {
    position: relative;
  }

  a.selected {
    font-weight: bold;
  }
  a.selected:after {
    position: absolute;
    bottom: -.5em;
    left: calc(50% - 3px);

    content: "";
    width: 6px;
    height: 6px;
    background-color: #A81039;
    border-radius: 50%;
    box-shadow: 0 0 3px #000;
  }

	.title-container {
	  padding: 2.5em 1em 5em;
	}

	h1 {
	  text-transform: uppercase;
	  font-size: 2.5em;
	}

	p {
	  font-weight: bold;
	  font-size: 1.25em;
	}

	@media screen and (min-width: 768px) {
	  h1 {
	    font-size: 3.5em;
	  }
	  p {
	    font-size: 1.45em;
	  }
	}

	@media screen and (min-width: 1024px) {
  	header {
      background: url(/headerbg-large.jpg);
    }
	  h1 {
	    font-size: 4.375em;
	  }
	  p {
	    font-size: 1.625em;
	  }
	}

</style>

<header class="text-center">
  <nav>
    <ul>
      <li><a class:selected="{segment === undefined}" href=".">Features</a></li>
      <li><a class:selected="{segment === 'articles'}" href="/articles/">Articles</a></li>
      <li><a class:selected="{segment === 'services'}" href="https://adambar.pl/#services" target="_blank" rel="noreferrer noopener">Services</a></li>
      <li><a class:selected="{segment === 'trainings'}" href="https://adambar.pl/#workshops" target="_blank" rel="noreferrer noopener">Trainings</a></li>
    </ul>
  </nav>

  <div class="title-container">
    <h1>What Web Can Do Today?</h1>

    <p>Can I rely on the Web Platform features to build my app?</p>
    <p>An overview of the device integration HTML5 APIs</p>
  </div>
</header>
