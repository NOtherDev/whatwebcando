<script>
  import { stores } from '@sapper/app';
  import Header from '../components/Header.svelte';
  import Footer from '../components/Footer.svelte';

  export let segment;

  const { page } = stores();

  if (process.browser && navigator.serviceWorker) {
    navigator.serviceWorker.getRegistration()
      .then((registration) => {
        if (registration && !!navigator.serviceWorker.controller) {
          registration.addEventListener('updatefound', () => {
            registration.installing.addEventListener('statechange', () => {
              if (registration.waiting) {
                // mark there was new service worker installed and the pages need refresh
                localStorage.setItem('shouldRefresh', 'true')
              }
            })
          })
        }
      })
  }

  page.subscribe(async ({ path }) => {
    if (process.browser && window.gaPageView) {
      window.gaPageView(path)
    }
    // detect the pending refresh and fire it on navigation
    if (process.browser && !!localStorage.getItem('shouldRefresh') && !!navigator.serviceWorker.controller) {
      localStorage.removeItem('shouldRefresh')
      navigator.serviceWorker.controller.postMessage('refresh')
    }
  })
</script>

<style type="text/scss" global>
  @import "../charts/charts.scss"
</style>

<Header {segment}/>

<slot></slot>

<Footer/>
