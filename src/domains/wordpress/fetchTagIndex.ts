import fetch from 'node-fetch';

import config from '../../config';

/**
 * 特定のタグの記事Indexを取得する
 * @param tagId タグID
 * @param pageNumber ページ番号
 */
export async function fetchTagIndex(tagId: number, pageNumber: number = 1) {
  /** リクエストパラメータ */
  const params = `?context=embed&tags=${tagId}&per_page=${config.perPage}&page=${pageNumber}`;

  /** リクエストURL */
  const url = `${config.blogUrl}/wp-json/wp/v2/posts${params}`;

  return fetch(url, {
    method: 'get',
  })
    // .then(TagContainer.handleErrors)
    .then((res: any) => {
      if (res.status === 200) {
        return [res.json(), res.headers._headers, tagId];
      }
      return console.dir(res);
    })
    .catch(() => console.log('bad request'));
}