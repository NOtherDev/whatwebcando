<script>
  import { stores } from '@sapper/app';
  import Header from '../components/Header.svelte';
  import Footer from '../components/Footer.svelte';

  export let segment;

  const { page } = stores();

  page.subscribe(({ path }) => {
    if (process.browser && window.gaPageView) {
      window.gaPageView(path)
    }
  })
</script>

<style type="text/scss" global>
  @import "../charts/charts.scss"
</style>

<Header {segment}/>

<slot></slot>

<Footer/>
