import fetch from 'isomorphic-fetch';

import config from '../../config';

/**
 * タグ名を取得する
 * @param tagIds 名前を取得したいタグID
 */
export async function fetchTagName(tagId: number) {
  /** リクエストパラメータ */
  const params = `?include=${tagId}&context=embed`;

  /** リクエストURL */
  const url = `${config.blogUrl}/wp-json/wp/v2/tags${params}`;

  return fetch(url, {
    method: 'get',
    mode: 'cors',
  })
    .then((res: Response) => {
      if (res.status === 200) {
        return res.json();
      }
      return console.dir(res);
    })
    .then((res: any) => {
      if (typeof res[0].name === 'string') {
        return res[0].name;
      }
    });
}
