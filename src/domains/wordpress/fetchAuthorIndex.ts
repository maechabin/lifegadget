import fetch from 'isomorphic-fetch';

import config from '../../config';

/**
 * 特定の著者の記事Indexを取得する
 * @param authorId 著者ID
 * @param pageNumber ページ番号
 */
export async function fetchAuthorIndex(pageNumber: number = 1, authorId: number) {
  /** リクエストパラメータ */
  const params = `?context=embed&author=${authorId}&per_page=${config.perPage}&page=${pageNumber}`;

  /** リクエストURL */
  const url = `${process.env.REACT_APP_API_URI}/wp-json/wp/v2/posts${params}`;

  return (
    fetch(url, {
      method: 'get',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      // .then(AuthorContainer.handleErrors)
      .then((res: Response) => {
        if (res.status === 200) {
          return {
            index: res.json(),
            total: res.headers.get('x-wp-total'),
            totalPages: res.headers.get('x-wp-totalpages'),
          };
        }
        console.error(res);
      })
      .catch(() => console.log('bad request'))
  );
}
