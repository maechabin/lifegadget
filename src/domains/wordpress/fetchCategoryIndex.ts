import fetch from 'isomorphic-fetch';

import config from '../../config';

/**
 * 特定のカテゴリーの記事Indexを取得する
 * @param authorId カテゴリーID
 * @param pageNumber ページ番号
 */
export async function fetchCategoryIndex(pageNumber: number = 1, categoryId: number) {
  /** リクエストパラメータ */
  const params = `?context=embed&categories=${categoryId}&per_page=${
    config.perPage
  }&page=${pageNumber}`;

  /** リクエストURL */
  const url = `${config.blogUrl}/wp-json/wp/v2/posts${params}`;

  return (
    fetch(url, {
      method: 'get',
      mode: 'cors',
    })
      // .then(CategoryContainer.handleErrors)
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
