import fetch from 'node-fetch';

import config from '../../config';

/**
 * 指定したページのIndex（記事一覧）を取得する
 * @param page ページ数
 */
export function fetchIndex(page: number = 1) {
  /** リクエストパラメータ */
  const params = `?context=embed&per_page=${config.perPage}&page=${page}`;

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
