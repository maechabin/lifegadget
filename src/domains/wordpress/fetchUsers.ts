import fetch from 'node-fetch';

import config from '../../config';

/**
 * ユーザー一覧を取得する
 */
export async function fetchUsers() {
  /** リクエストURL */
  const url = `${config.blogUrl}/wp-json/wp/v2/users`;

  return fetch(url, {
    method: 'get',
  })
    .then((res: any) => {
      if (res.status === 200) {
        return res.json();
      }
      return console.dir(res);
    })
    .catch(() => console.log('bad request'));
}