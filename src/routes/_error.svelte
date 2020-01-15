<script>
  import {afterUpdate} from 'svelte';
  import Meta from '../components/Meta.svelte';

	export let status;
	export let error;

	const dev = process.env.NODE_ENV === 'development';

	if (process.browser) {
    afterUpdate(async () => {
      // dynamic module import might fail with undefined or "failed to fetch" error when no valid SW -
      // this means that probably the newer version was deployed in the meantime and there's nowhere to fetch the code from
      // all we can hope is that refresh fixes it
      if (error && status === 500 && (!error.message || error.message.startsWith("Failed to fetch"))) {
        // one unlikely but possible cause is that SW is broken for some reason - let's get rid of it
        if ('serviceWorker' in navigator) {
          const registration = await navigator.serviceWorker.getRegistration()
          if (registration) {
            await registration.unregister()
          }
        }

        window.location.reload(true)
      }
    })
  }
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
