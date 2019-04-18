import fetch from 'isomorphic-fetch';

import config from '../../config';

/**
 * 特定の著者の記事Indexを取得する
 * @param authorId 著者ID
 * @param pageNumber ページ番号
 */
export async function fetchAuthorIndex(authorId: number, pageNumber: number = 1) {
  /** リクエストパラメータ */
  const params = `?context=embed&author=${authorId}&per_page=${config.perPage}&page=${pageNumber}`;

  /** リクエストURL */
  const url = `${config.blogUrl}/wp-json/wp/v2/posts${params}`;

  return fetch(url, {
    method: 'get',
  })
    // .then(AuthorContainer.handleErrors)
    .then((res: any) => {
      if (res.status === 200) {
        return [res.json(), res.headers._headers];
      }
      return console.dir(res);
    })
    .catch(() => console.log('bad request'));
}