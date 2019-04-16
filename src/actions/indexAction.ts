import { Dispatch } from 'redux';
import fetch from 'node-fetch';

import { Action, IndexActionType } from './action.model';
import config from '../config';

export function resetList() {
  return {
    type: IndexActionType.RESET_LIST,
  };
}

export function saveRoutingKey(payload: string): Action<string> {
  return {
    type: IndexActionType.SAVE_ROUTING_KEY,
    payload,
  };
}

export function setCurrentPageNumber(payload: number): Action<number> {
  return {
    type: IndexActionType.SET_CURRENT_PAGE_NUMBER,
    payload,
  };
}

/**
 * 任意のIDのアイキャッチ画像を取得して返す
 * @param url media用URL
 */
export async function getEyeCatchImageUrl(url: string): Promise<{ source_url: string }> {
  return fetch(url, {
    method: 'get',
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      return console.dir(res);
    })
    .then((data) => {
      return {
        source_url: data.source_url,
      };
    });
}

function getTagName(payload: string): Action<string> {
  return {
    type: IndexActionType.GET_TAG_NAME,
    payload,
  };
}

export function getTagNameAsync(tag: number) {
  return async (dispatch: Dispatch) => {
    return fetch(`${config.blogUrl}/wp-json/wp/v2/tags?include=${tag}&context=embed`, {
      method: 'get',
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return console.dir(res);
      })
      .then((res) => {
        if (typeof res[0].name === 'string') {
          return dispatch(getTagName(res[0].name));
        }
      });
  };
}

function badRequestIndex(): Action {
  return {
    type: IndexActionType.BAD_REQUEST_INDEX,
  };
}

function fetchIndex(payload: any): Action<any> {
  return {
    type: IndexActionType.FETCH_INDEX,
    payload,
  };
}

// redux-thunk
export function fetchIndexAsync(callback: any, page: number = 1) {
  return async (dispatch: Dispatch) => {
    return callback(page).then((res: any) => {
      if (res === undefined) {
        return dispatch(badRequestIndex());
      }
      Promise.resolve(res[0]).then((res2) =>
        Promise.all(
          res2.map((res3: any) => {
            if (res3._links['wp:featuredmedia']) {
              return getEyeCatchImageUrl(res3._links['wp:featuredmedia'][0].href);
            }
            return false;
          }),
        )
          .then((res4) => res2.map((obj: any, i: number) => Object.assign({}, obj, res4[i])))
          .then((index) => dispatch(fetchIndex({ index, page: res[1] }))),
      );
    });
  };
}

export function searchArticleAsync(callback: any, keyword: string, page: number) {
  return async (dispatch: Dispatch) => {
    return callback(keyword, page).then((res: any) => {
      if (res === undefined) {
        return dispatch(badRequestIndex());
      }
      Promise.resolve(res[0]).then((res2) =>
        Promise.all(
          res2.map((res3: any) => {
            if (res3._links['wp:featuredmedia']) {
              return getEyeCatchImageUrl(res3._links['wp:featuredmedia'][0].href);
            }
            return false;
          }),
        )
          .then((res4) => res2.map((obj: any, i: number) => Object.assign({}, obj, res4[i])))
          .then((index) => dispatch(fetchIndex({ index, page: res[1] }))),
      );
    });
  };
}
