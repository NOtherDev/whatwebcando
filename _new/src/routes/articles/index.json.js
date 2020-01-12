import articles from './_articles.js';

const contents = JSON.stringify(articles.map((article) => ({
  title: article.title,
  slug: article.slug,
  image: article.image,
  tags: article.tags,
  description: article.description,
  author: article.author,
  weight: article.weight,
})));

export function get(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  res.end(contents);
}
