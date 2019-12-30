import {readdirSync, readFileSync} from 'fs'
import {join as pathJoin} from 'path'
import marked from 'marked'
import parseMetadata from 'parse-md/dist/cjs'

const tagRegex = /<h1.*>(.*)<\/h1>/im
const articlesPath = pathJoin(__dirname, '../../../src/data/articles')

const articles = readdirSync(articlesPath)
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
    }
  })

articles.forEach(article => {
  article.html = article.html.replace(/^\t{3}/gm, '');
});

export default articles;
