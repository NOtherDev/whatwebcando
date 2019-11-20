<script>
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';

	export let segment;
</script>

<style>

</style>

<Header {segment}/>

<slot></slot>

<Footer/>
