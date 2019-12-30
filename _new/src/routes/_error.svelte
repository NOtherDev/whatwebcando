<script>
  import Meta from '../components/Meta.svelte';

	export let status;
	export let error;

	const dev = process.env.NODE_ENV === 'development';
</script>

<svelte:head>
  <Meta title="Error {status}" />
</svelte:head>

<main class="page">
  <h1>{status}</h1>

  <p>{error.message}</p>

  {#if dev && error.stack}
    <pre>{error.stack}</pre>
  {/if}
</main>
