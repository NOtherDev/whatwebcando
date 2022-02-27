const ghpages = require('gh-pages');

ghpages.publish(
    '__sapper__/export',
    {
        branch: 'gh-pages',
        remote: 'origin',
        message: 'Deploy on GitHub Pages via gh-pages script',
    },
    () => {
        console.log('Deploy on GitHub Pages Complete!')
    }
)