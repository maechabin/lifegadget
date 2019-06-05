import fetch from 'isomorphic-fetch';

require('dotenv').config();

export type User = {
  avatar_urls: any;
  description: string;
  id: number;
  link: string;
  meta: any[];
  name: string;
  slug: string;
  url: string;
  _links: any;
};

/**
 * ユーザー一覧を取得する
 */
export async function fetchUsers(): Promise<User[]> {
  /** リクエストURL */
  const url = `${process.env.REACT_APP_API_URI}/wp-json/wp/v2/users`;

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
    .catch(() => console.log('bad request'));
}
