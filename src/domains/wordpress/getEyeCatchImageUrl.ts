import fetch from 'isomorphic-fetch';

/**
 * 任意のIDのアイキャッチ画像を取得して返す
 * @param url wp:featuredmedia URL
 */
export async function getEyeCatchImageUrl(url: string) {
  return fetch(url, {
    method: 'get',
    mode: 'cors',
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      return console.dir(res);
    })
    .then((data) => {
      return data.source_url;
    });
}