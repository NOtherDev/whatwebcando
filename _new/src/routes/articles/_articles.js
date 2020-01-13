import {readdirSync, readFileSync} from 'fs'
import {join as pathJoin} from 'path'
import marked from 'marked'
import parseMetadata from 'parse-md/dist/cjs'

const tagRegex = /<h1.*>(.*)<\/h1>/im
const articlesPath = pathJoin(__dirname, '../../../src/data/articles')

const ownArticles = readdirSync(articlesPath)
  .map((fileName) => {
    const rawContent = readFileSync(pathJoin(articlesPath, fileName), {encoding: 'utf-8'})
    const {metadata, content} = parseMetadata(rawContent)
    const parsedContent = marked(content)

    return {
      title: metadata.title || tagRegex.exec(parsedContent)[1],
      slug: fileName.replace(/\.md$/, ''),
      html: parsedContent,
      image: metadata.image || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=',
      tags: metadata.tags || [],
      description: metadata.description || '',
      author: marked(metadata.author || '[Adam Bar](https://adambar.pl)'),
      weight: metadata.weight || 1,
      source: 'wwcd',
    }
  })

ownArticles.forEach(article => {
  article.html = article.html.replace(/^\t{3}/gm, '');
});

const externalArticles = [
  {
    title: 'A Good Push Notification',
    url: 'https://pwafire.org/developer/docs/a-good-push-notification/',
    image: '/articleimgs/letter-envelopes.pexels.jpg',
    tags: ['Push Notifications'],
    description: 'What makes a good Push Notifcation? Get tips to help you push value to your users and not users away.',
    source: 'pwafire.org',
  },
  {
    title: 'Add Native App Install Banner',
    url: 'https://pwafire.org/developer/docs/native-app-pwa/',
    image: '/articleimgs/street-lights.pexels.jpg',
    tags: ['Home Screen Installability'],
    description: 'Add support to tell the Web Browser to prompt the user with your native app install banner instead of the web app.',
    weight: 1,
    source: 'pwafire.org',
  },
  {
    title: 'Start Secure With HTTPS',
    url: 'https://pwafire.org/developer/docs/start-secure-with-https/',
    image: '/articleimgs/gold-padlock-locking-door.pexels.jpg',
    tags: ['HTTPS', 'PWA'],
    description: 'HTTPS is a crucial part of the user experience. It’s not just for really important or security-sensitive sites.',
    weight: 1,
    source: 'pwafire.org',
  },
]

export default ownArticles.concat(externalArticles);
