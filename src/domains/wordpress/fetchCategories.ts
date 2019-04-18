import fetch from 'isomorphic-fetch';

import config from '../../config';

/**
 * カテゴリー一覧を取得する
 */
export async function fetchCategories() {
  /** リクエストURL */
  const url = `${config.blogUrl}/wp-json/wp/v2/categories`;

  return fetch(url, {
    method: 'get',
  }).then((res: any) => {
    if (res.status === 200) {
      return res.json();
    }
    return console.dir(res);
  });
}
