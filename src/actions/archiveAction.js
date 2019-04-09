import fetch from 'node-fetch';
import config from '../config';

// 任意のIDのアイキャッチ画像の取得、保存
export const GET_ARTICLE_IMAGE = 'GET_ARTICLE_IMAGE';
function getArticleImage(payload) {
  return {
    type: GET_ARTICLE_IMAGE,
    payload,
  };
}

export function getArticleImageAsync(url) {
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
    .then((res2) => {
      return {
        source_url: res2.source_url,
      };
    });
}

export const BAD_REQUEST_ARCHIVE = 'BAD_REQUEST_ARCHIVE';
function badRequestArchive() {
  return {
    type: BAD_REQUEST_ARCHIVE,
  };
}

// Action creator
export const FETCH_ARTICLE = 'FETCH_ARTICLE';
export function fetchArticle(payload) {
  return {
    type: FETCH_ARTICLE,
    payload,
  };
}
// redux-thunk

export function fetchArticleAsync(callback, id) {
  return (dispatch) => {
    return callback(id)
      .then((res) => {
        if (res === undefined) {
          return dispatch(badRequestArchive());
        }
        return dispatch(fetchArticle(res));
      })
      .then((res2) => {
        if (res2.payload !== undefined && res2.payload._links['wp:featuredmedia']) {
          return getArticleImageAsync(res2.payload._links['wp:featuredmedia'][0].href);
        }
        return false;
      })
      .then((res3) => {
        if (res3) {
          return dispatch(getArticleImage(res3.source_url));
        }
      });
  };
}

// TagIDからTag名取得
export const GET_TAGS = 'GET_TAGS';
export function getTags(payload) {
  return {
    type: GET_TAGS,
    payload,
  };
}

export function getTagsAsync(array) {
  return (dispatch) => {
    const tags = array.map((id) =>
      fetch(`${config.blogUrl}/wp-json/wp/v2/tags/${id}`, {
        method: 'get',
        mode: 'cors',
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
          return console.dir(res);
        })
        .then((res) => {
          return {
            name: res.name,
            slug: res.slug,
          };
        }),
    );
    Promise.all(tags).then((res) => {
      dispatch(getTags(res));
    });
  };
}
