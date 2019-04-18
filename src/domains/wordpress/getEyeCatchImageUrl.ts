/**
 * 任意のIDのアイキャッチ画像を取得して返す
 * @param url wp:featuredmedia URL
 */
export async function getEyeCatchImageUrl(url: string) {
  console.log(url);
  fetch(url, {
    method: 'get',
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      return console.dir(res);
    })
    .then((data) => {
      console.log(data);
      Promise.resolve({
        source_url: data.source_url,
      });
    });
}
