import fetch from 'isomorphic-fetch';

/**
 * 任意のIDのアイキャッチ画像を取得して返す
 * @param url wp:featuredmedia URL
 */
export async function getEyeCatchImageUrl(url: string): Promise<string | null> {
  return fetch(url, {
    method: 'get',
    mode: 'cors',
  })
    .then((res: Response) => {
      if (res.status === 200) {
        return res.json();
      }
      return null;
    })
    .then((data) => {
      return data && data.source_url;
    });
}
