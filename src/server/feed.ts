import RSS from 'rss';

import { fetchIndex } from '../domains/wordpress';
import { Index } from '../index/indexState';
import config from '../config';

export default async function makeRss() {
  const feed = new RSS({
    title: `${config.blogTitle}`,
    description: `${config.blogSubTitle}`,
    feed_url: `https://${config.blogDomain}/feed`,
    site_url: `https://${config.blogDomain}`,
    image_url: `https://${config.blogDomain}/assets/images/${config.blogDefaultImage}`,
    copyright: `${config.blogTitle}`,
    language: 'ja',
    pubDate: new Date(),
    ttl: 60,
  });
  const PAGE_NUMBER = 1;

  const response = await fetchIndex(PAGE_NUMBER);
  if (response) {
    const indexes = await response.index.then((index: Index[]) => index);
    indexes.forEach((index) =>
      feed.item({
        title: index.title.rendered,
        description: index.excerpt.rendered,
        url: `https://${config.blogDomain}/archives/${index.id}`,
        guid: String(index.id),
        date: index.date,
      }),
    );
  }

  return feed.xml();
}
