<script>
  import {onMount} from 'svelte';

  if (process.browser) {
    onMount(() => {
      const $ad = document.querySelector('.ad')

      if ($ad && (navigator.language || '').toLowerCase().includes('pl')) {
        $ad.innerHTML = `<div id="carbonads" style="background: var(--primary-background); color: black;">
          <span class="carbon-wrap">
            <span>
            <strong>Chcesz zostać ekspertem Mobile Weba?</strong><br/>
            🔥 Szkolenie: Progresywne Aplikacje Webowe<br/>
            🌍 Warszawa<br/>
            📅 25-27 marca 2020<br/>
            👨‍🏫 <a href="https://adambar.pl/pl.html" target="_blank" rel="noopener">Adam Bar</a>, autor What Web Can Do Today
            </span>
          </span>
          <span class="carbon-wrap" style="justify-content: center">
            <a href="https://bottega.com.pl/nabor-otwarty-progresywne-aplikacje-web" target="_blank" rel="noopener"
              class="button"
              style="margin-top: .5em; padding: .5em 1.5em">
              Zapisz się na szkolenie
            </a>
          </span>
        </div>`
      }
    })
  }
</script>

<style>
  h2 {
    font-size: 1.125em;
    padding: 1em 1em 0;
    text-transform: uppercase;
  }
</style>

<h2>Advertisement</h2>
<div class="ad">
  <script async type="text/javascript" src="//cdn.carbonads.com/carbon.js?serve=CK7DT23L&placement=whatwebcandotoday" id="_carbonads_js"></script>
</div>
