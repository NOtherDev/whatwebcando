<script>
  import features from '../data/features'
  import groups from '../data/groups'

  groups.forEach((group) => {
    group.resolvedFeatures = group.features.map((feature) => {
      const fullFeature = features.find(f => f.id === feature.id)
      fullFeature.icon = feature.icon
      return fullFeature
    })
  })


  let filteredGroups = [...groups];
  let filter = '';

  function filterFeatures() {
    const normalizedFilter = filter.toLocaleLowerCase().trim()

    if (normalizedFilter.length < 2) {
      filteredGroups = [...groups]
    } else {
      filteredGroups = groups
        .map((group) => {
          return {
            ...group,
            resolvedFeatures: group.resolvedFeatures.filter((feature) => {
              return feature.name.toLocaleLowerCase().indexOf(normalizedFilter) !== -1
                || feature.description.some((d) => d.toLocaleLowerCase().indexOf(normalizedFilter) !== -1)
                || feature.api.toLocaleLowerCase().indexOf(normalizedFilter) !== -1
            })
          }
        })
        .filter((group) => !!group.resolvedFeatures.length)
    }
  }

</script>

<style type="text/scss">
  h2 {
    font-size: 1.125em;
    text-transform: uppercase;
  }

  .features-list-container {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: space-between;
    margin-top: 1em;

    &:empty:before {
      content: 'No matching features found.';
      width: 100%;
      padding: 2em;
      border: 1px dashed var(--primary-border);
      background-color: #fff;
      border-radius: 10px;
      text-align: center;
    }
  }

  section {
    width: 100%;
    margin-bottom: 1em;
    padding: 1.25em;
    border: 1px solid var(--primary-border);
    background-color: #fff;
    border-radius: 10px;
  }

  @media screen and (min-width: 768px) {
    section {
      padding: 2em;
    }

    ul {
      margin-bottom: 1em;
    }
  }

  h3 {
    font-size: 1.375em;
  }

  ul {
    list-style: none;
    margin-bottom: 0;
    padding: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    padding: .5em 0;

    .mdi:not(:last-child) {
      margin-right: .5em;
    }
  }

  @media screen and (min-width: 1024px) {
    .level {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
  }

  .filter-input {
    width: 100%;
    box-sizing: border-box;
    padding: .5em 1em .5em 2em;
    border: 1px solid var(--primary-border);
    border-radius: 10px;
    background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath d='M1 0h22l-9 15.094v8.906l-4-3v-5.906z' fill='none' stroke-width='2' stroke='%23757575'/%3E%3C/svg%3E") no-repeat .65em center;
    font: inherit;
  }

  @media screen and (min-width: 1024px) {
    .filter-input {
      width: 8em;
      transition: width 0.3s ease-in-out;

      &:focus {
        width: 16em;
      }
    }
  }

  .legend {
    div {
      display: flex;
    }

    dt {
      min-width: 65px;
    }
    dd {
      margin-left: 0;
    }
  }
  
  .support {
    text-transform: uppercase;
    font-weight: bold;
    white-space: nowrap;
  }

  .support-no {
    color: #A81039;
  }
  .support-yes .mdi {
    color: #4caf50;
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

<div class="level">
  <div>
    <h2>Features</h2>

    <dl class="legend" aria-hidden="true">
      <div>
        <dt class="support support-yes">Yes <i class="mdi mdi-check"></i></dt>
          <dd>Feature available in your current browser</dd>
      </div>
      <div>
        <dt class="support support-no">No <i class="mdi mdi-cross"></i></dt>
          <dd>Feature not available in your current browser</dd>
      </div>
    </dl>
  </div>

  <input type="text"
         class="filter-input"
         placeholder="Filter"
         bind:value={filter}
         on:keyup={filterFeatures} />
</div>

<div class="features-list-container">
  {#each filteredGroups as group}
  <section>
    <h3>{group.heading}</h3>

    <ul>
      {#each group.resolvedFeatures as feature}
      <li>
        <span><i class="mdi {feature.icon}"></i> <a rel="prefetch" href="/{feature.id}.html">{feature.name}</a></span>
        {#await feature.determineIsSupported() then isSupported}
          {#if isSupported}
            <span class="support support-yes">Yes <i class="mdi mdi-check"></i></span>
          {:else}
            <span class="support support-no">No <i class="mdi mdi-cross"></i></span>
          {/if}
        {/await}
      </li>
      {/each}
    </ul>
  </section>
  {/each}
</div>
