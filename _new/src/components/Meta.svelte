<script>
  export let title = null
  export let url = null
  export let description = null
  export let image = null
</script>

<title>What Web Can Do Today: {title}</title>

<meta property="og:title" content="What Web Can Do Today: {title}" />
<meta property="og:description" content="{description || 'Can I rely on the Web Platform features to build my app? An overview of the device integration HTML5 APIs.'}" />
<meta property="og:url" content="https://whatwebcando.today/{url || ''}" />
<meta property="og:image" content="https://whatwebcando.today/{image || 'images/share-image.png'}" />

<meta name="twitter:title" content="What Web Can Do Today: {title}" />
<meta name="twitter:description" content="{description || 'Can I rely on the Web Platform features to build my app? An overview of the device integration HTML5 APIs.'}" />
<meta name="twitter:image" content="https://whatwebcando.today/{image || 'images/share-image.png'}" />
