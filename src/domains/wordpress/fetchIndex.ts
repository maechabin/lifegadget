import fetch from 'node-fetch';

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
    if (res.status === 200) {
      return [res.json(), res.headers._headers];
    }
    return console.log(res);
  });
}
