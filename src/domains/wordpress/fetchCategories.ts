import fetch from 'isomorphic-fetch';

import config from '../../config';

export type WP_Category = {
  /** カテゴリーID */
  id: number;
  /** 所属記事数 */
  count: number;
  /** カテゴリーの説明 */
  description: string;
  /** カテゴリーページURL */
  link: string;
  /** カテゴリーメタ情報 */
  meta: string[];
  /** カテゴリー名 */
  name: string;
  /** 親カテゴリー */
  parent: number;
  /** カテゴリースラグ */
  slug: string;
  /** タクソノミー */
  taxonomy: string;
  /** 付随情報へのリンク */
  _links: any;
};

/**
 * カテゴリー一覧を取得する
 */
export async function fetchCategories(): Promise<WP_Category[]> {
  /** リクエストURL */
  const url = `${config.blogUrl}/wp-json/wp/v2/categories`;
  return fetch(url, {
    method: 'get',
    mode: 'no-cors',
  }).then((res: Response) => {
    if (res.status === 200) {
      return res.json();
    }
    return console.dir(res);
  });
}
