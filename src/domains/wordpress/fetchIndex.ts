import fetch from 'isomorphic-fetch';

import config from '../../config';

/**
 * 記事Indexを取得する
 * @param pageNumber ページ番号
 */
export async function fetchIndex(pageNumber: number = 1) {
  /** リクエストパラメータ */
  const params = `?context=embed&per_page=${config.perPage}&page=${pageNumber}`;

  /** リクエストURL */
  const url = `${config.blogUrl}/wp-json/wp/v2/posts${params}`;

  return fetch(url, {
    method: 'get',
  }).then((res: any) => {
    console.log(res);
    if (res.status === 200) {
      return {
        indexes: res.json(),
        headers: res.headers._headers,
      };
    }
    return console.log(res);
  });
}
