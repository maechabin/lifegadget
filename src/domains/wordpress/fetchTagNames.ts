import fetch from 'isomorphic-fetch';

import config from '../../config';

/**
 * タグ名一覧を取得する
 * @param tagIds 名前を取得したいタグIDの配列
 */
export async function fetchTagNames(tagIds: number[]) {
  const tags = tagIds.map(async (tagId: number) => {
    /** リクエストURL */
    const url = `${config.blogUrl}/wp-json/wp/v2/tags/${tagId}`;

    return fetch(url, {
      method: 'get',
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return console.dir(res);
      })
      .then((res: any) => {
        return {
          name: res.name,
          slug: res.slug,
        };
      });
  });
  Promise.all(tags).then((res) => {
    return res;
  });
}