<script>
  import features from '../data/features'
  import groups from '../data/groups'

  groups.forEach(group => {
    group.resolvedFeatures = group.features.map(feature => features.find(f => f.id === feature.id))
  })

</script>

<style>
  .features-list-container {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: space-between;
    margin-top: 1em;
  }

  section {
    width: 100%;
    margin-bottom: 1em;
    padding: 2em;
    border: 1px solid var(--primary-border);
    background-color: #fff;
    border-radius: 10px;
  }

  h3 {
    font-size: 1.375em;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    padding: .5em 0;
  }
  
  .support {
    width: 2em;
    text-transform: uppercase;
    font-weight: bold;
  }

  .support-no {
    color: #A81039;
  }

  @media screen and (min-width: 1024px) {
    section {
      width: unset;
      min-width: 16em;
    }
  }

  @media screen and (min-width: 1440px) {
    section {
      min-width: 24em;
    }
  }
</style>

<div class="features-list-container">
  {#each groups as group}
  <section>
    <h3>{group.heading}</h3>

    <ul>
      {#each group.resolvedFeatures as feature}
      <li>
        <span><a rel="prefetch" href="/{feature.id}.html">{feature.name}</a></span>
        {#await feature.determineIsSupported() then isSupported}
          {#if isSupported}
            <span class="support support-yes">Yes</span>
          {:else}
            <span class="support support-no">No</span>
          {/if}
        {/await}
      </li>
      {/each}
    </ul>
  </section>
  {/each}
</div>
