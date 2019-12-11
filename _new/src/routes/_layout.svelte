<script>
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';

	export let segment;
</script>

<style type="text/scss" global>
  @import "../charts/charts.scss"
</style>

<Header {segment}/>

<slot></slot>

<Footer/>
