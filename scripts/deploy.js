const ghpages = require('gh-pages');
const { exec } = require("child_process");

exec("git rev-parse HEAD", (error, revHash) => {
  if (error) {
    console.error(error)
    return
  }

  ghpages.publish(
    '__sapper__/export',
    {
      branch: 'gh-pages',
      remote: 'origin',
      message: `Update to ${revHash.trim()}`,
      add: true,
    },
    () => {
      console.log('Deploy on GitHub Pages Complete!')
    }
  )
})
