import RSS from 'rss';
import fetch from 'node-fetch';
import config from '../config';

const feed = new RSS({
  title: 'LifeGadget',
  description: '生活をサポートする記事メディア',
  feed_url: 'http://lifegadget.me/feed',
  site_url: 'http://lifegadget.me',
  image_url: `${config.blogUrl}${config.blogDefaultImage}`,
  copyright: '2017 f@n communicaions',
  pubDate: new Date(),

  author: {
    name: 'LifeGadget',
    link: 'http://lifegadget.me'
  }
});

function fetchData() {
  const params = `?context=embed&per_page=20&page=1`;
  return fetch(`${config.blogUrl}/wp-json/wp/v2/posts${params}`, {
    method: 'get',
    mode: 'cors',
  })
  .then((res) => {
    if (res.status === 200) {
      console.log(res.json());
      return res.json();
    }
    return console.log(res);
  })
}

fetchData();

const xml = feed.xml();
export default xml;
