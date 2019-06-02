import fetch from 'isomorphic-fetch';

export type WP_Tag = {
  id: number;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  _links: any;
};

/**
 * タグ名を取得する
 * @param tagIds 名前を取得したいタグID
 */
export async function fetchTagName(tagId: number): Promise<string> {
  /** リクエストパラメータ */
  const params = `?include=${tagId}&context=embed`;

  /** リクエストURL */
  const url = `${process.env.REACT_APP_API_URI}/wp-json/wp/v2/tags${params}`;

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
    .then((res: WP_Tag[]) => {
      return res[0].name;
    });
}
