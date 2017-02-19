import RSS from 'rss';
import fetch from 'node-fetch';
import config from '../config';

export default function makeRss() {
  const feed = new RSS({
    title: 'LifeGadget',
    description: '生活をサポートする記事メディア',
    feed_url: 'http://lifegadget.me/feed',
    site_url: 'http://lifegadget.me',
    image_url: `${config.blogUrl}${config.blogDefaultImage}`,
    copyright: '2017 f@n communicaions',
    language: 'ja',
    pubDate: new Date(),
    ttl: '60',

    author: {
      name: 'LifeGadget',
      link: 'http://lifegadget.me',
    },
  });

  function fetchData() {
    const params = '?context=embed&per_page=20&page=1';
    return fetch(`${config.blogUrl}/wp-json/wp/v2/posts${params}`, {
      method: 'get',
      mode: 'cors',
    })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      return console.log(res);
    });
  }

  return fetchData().then((res) => {
    res.forEach(data => {
      feed.item({
        title: data.title.rendered,
        description: data.excerpt.rendered,
        url: `http://lifegadget.me/archives/${data.id}`,
        guid: data.id,
        date: data.date,
      });
    });
    return feed.xml();
  });
}
