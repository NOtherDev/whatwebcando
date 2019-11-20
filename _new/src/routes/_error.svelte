<script>
	export let status;
	export let error;

	const dev = process.env.NODE_ENV === 'development';
</script>

<svelte:head>
	<title>What Web Can Do Today: {status}</title>
</svelte:head>

<main class="page">
  <h1>{status}</h1>

  <p>{error.message}</p>

  {#if dev && error.stack}
    <pre>{error.stack}</pre>
  {/if}
</main>
