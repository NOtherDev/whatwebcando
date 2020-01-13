import articles from './_articles.js';

const data = articles.map((article) => ({
  title: article.title,
  url: article.url,
  slug: article.slug,
  image: article.image,
  tags: article.tags,
  description: article.description,
  weight: article.weight,
  source: article.source,
}))

export function get(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  res.end(JSON.stringify(data));
}
