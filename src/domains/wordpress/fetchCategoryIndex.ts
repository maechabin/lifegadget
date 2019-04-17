import fetch from 'node-fetch';

import config from '../../config';

/**
 * 特定のカテゴリーの記事Indexを取得する
 * @param authorId カテゴリーID
 * @param pageNumber ページ番号
 */
export async function fetchData(categoryId: number, pageNumber: number = 1) {
  /** リクエストパラメータ */
  const params = `?context=embed&categories=${categoryId}&per_page=${config.perPage}&page=${pageNumber}`;

  /** リクエストURL */
  const url = `${config.blogUrl}/wp-json/wp/v2/posts${params}`;

  return fetch(url, {
    method: 'get',
  })
    // .then(CategoryContainer.handleErrors)
    .then((res: any) => {
      if (res.status === 200) {
        return [res.json(), res.headers._headers];
      }
      return console.log(res);
    })
    .catch(() => console.log('bad request'));
}