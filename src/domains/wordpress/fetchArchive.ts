import fetch from 'node-fetch';

import config from '../../config';

/**
 * 記事データを取得する
 * @param articleId 取得する記事のID
 */
export async function fetchArchive(articleId: number) {
  /** リクエストパラメータ */
  const params = '?context=view`';

  /** リクエストURL */
  const url = `${config.blogUrl}/wp-json/wp/v2/posts/${articleId}${params}`;

  return (
    fetch(url, {
      method: 'get',
    })
      // .then(ArchiveContainer.handleErrors)
      .then((res: any) => {
        if (res.status === 200) {
          return res.json();
        }
        return console.log(res);
      })
      .catch(() => console.log('bad request'))
  );
}
