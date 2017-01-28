import fetch from 'node-fetch';
import config from '../../config';

export const RESET_LIST = 'RESET_LISET';
export function resetList() {
  return {
    type: RESET_LIST,
  };
}

export const SAVE_ROUTING_KEY = 'SAVE_ROUTING_KEY';
export function saveRoutingKey(payload) {
  return {
    type: SAVE_ROUTING_KEY,
    payload,
  };
}

export const SET_CURRENT_PAGE_NUMBER = 'SET_CURRENT_PAGE_NUMBER';
export function setCurrentPageNumber(payload) {
  return {
    type: SET_CURRENT_PAGE_NUMBER,
    payload,
  };
}

// 任意のIDのアイキャッチ画像の取得、保存
export const SAVE_MEDIA = 'SAVE_MEDIA';
function saveMedia(payload) {
  return {
    type: SAVE_MEDIA,
    payload,
  };
}
export function saveMediaAsync(url) {
  return fetch(url, {
    method: 'get',
    mode: 'cors',
  }).then((res) => {
    if (res.status === 200) {
      return res.json();
    }
    return console.dir(res);
  }).then(
    (res2) => {
      return {
        source_url: res2.source_url,
      };
    },
  );
}

export const GET_TAG_NAME = 'GET_TAG_NAME';
function getTagName(payload) {
  return {
    type: GET_TAG_NAME,
    payload,
  };
}
export function getTagNameAsync(tag) {
  return (dispatch) => {
    return fetch(`${config.blogUrl}/wp-json/wp/v2/tags?include=${tag}&context=embed`, {
      method: 'get',
      mode: 'cors',
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      return console.dir(res);
    }).then(
      res => {
        if (typeof res[0].name === 'string') {
          return dispatch(getTagName(res[0].name));
        }
      },
    );
  };
}

export const BAD_REQUEST_INDEX = 'BAD_REQUEST_INDEX';
function badRequestIndex() {
  return {
    type: BAD_REQUEST_INDEX,
  };
}

export const FETCH_INDEX = 'FETCH_INDEX';
function fetchIndex(payload) {
  return {
    type: FETCH_INDEX,
    payload,
  };
}
// redux-thunk
export function fetchIndexAsync(callback, page) {
  return (dispatch) => {
    return callback(page).then(
      res => {
        if (res === undefined) {
          return dispatch(badRequestIndex());
        }
        Promise.resolve(res[0]).then(
          res2 => Promise.all(res2.map(
            res3 => {
              if (res3._links['wp:featuredmedia']) {
                return saveMediaAsync(res3._links['wp:featuredmedia'][0].href);
              }
              return false;
            },
          ))
          .then(
            res4 => res2.map(
              (obj, i) => Object.assign({}, obj, res4[i]),
            ),
          )
          .then(
            index => dispatch(fetchIndex({ index, page: res[1] })),
          ),
        );
      },
    );
  };
}

export function searchArticleAsync(callback, keyword, page) {
  return (dispatch) => {
    return callback(keyword, page).then(
      res => {
        if (res === undefined) {
          return dispatch(badRequestIndex());
        }
        Promise.resolve(res[0]).then(
          res2 => Promise.all(res2.map(
            res3 => {
              if (res3._links['wp:featuredmedia']) {
                return saveMediaAsync(res3._links['wp:featuredmedia'][0].href);
              }
              return false;
            },
          ))
          .then(
            res4 => res2.map(
              (obj, i) => Object.assign({}, obj, res4[i]),
            ),
          )
          .then(
            index => dispatch(fetchIndex({ index, page: res[1] })),
          ),
        );
      },
    );
  };
}
