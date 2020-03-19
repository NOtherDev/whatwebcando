import fs from 'fs'
import features from '../src/data/features/index.js';

// requires nvm use v13.2.0

function createRedirectFile(file, redirectTarget) {
  console.log(`Creating redirect file ${file} to ${redirectTarget}.`);
  fs.writeFileSync(file, `<html>
<head>
  <meta http-equiv="Refresh" content="0; url=${redirectTarget}" />
</head>
<body>
  <p>Page moved - follow <a href="${redirectTarget}">this link</a>.</p>
</body>
</html>`)
}

features.forEach((feature) => {
  (feature.aliases || []).forEach((alias) => {
    createRedirectFile(`dist/${alias}.html`, `/${feature.id}.html`)
  })
})
