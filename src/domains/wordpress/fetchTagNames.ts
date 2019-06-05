import fetch from 'isomorphic-fetch';

require('dotenv').config();

/**
 * タグ名一覧を取得する
 * @param tagIds 名前を取得したいタグIDの配列
 */
export async function fetchTagNames(tagIds: number[]) {
  const tags = tagIds.map(async (tagId: number) => {
    /** リクエストURL */
    const url = `${process.env.REACT_APP_API_URI}/wp-json/wp/v2/tags/${tagId}`;

    return fetch(url, {
      method: 'get',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then((res: Response) => {
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

  return Promise.all(tags).then((tagName: { name: string; slug: string }[]) => tagName);
}
