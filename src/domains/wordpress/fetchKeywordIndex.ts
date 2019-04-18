import fetch from 'isomorphic-fetch';

import config from '../../config';

/**
 * 特定のキーワードを含む記事Indexを取得する
 * @param keyword キーワード
 * @param pageNumber ページ番号
 */
export async function fetchKeywordIndex(keyword: string, pageNumber: number = 1) {
  /** リクエストパラメータ */
  const params = `?context=embed&search=${keyword.trim()}&per_page=${config.perPage}&page=${pageNumber}`;

  /** リクエストURL */
  const url = `${config.blogUrl}/wp-json/wp/v2/posts${params}`;

  return fetch(url, {
    method: 'get',
  })
    // .then(SearchContainer.handleErrors)
    .then((res: any) => {
      if (res.status === 200) {
        return [res.json(), res.headers._headers];
      }
      return console.dir(res);
    })
    .catch(() => console.log('bad request'));
}