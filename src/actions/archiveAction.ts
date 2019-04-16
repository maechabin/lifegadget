import { Dispatch } from 'redux';
import fetch from 'node-fetch';

import { Action, ArchiveActionType } from './action.model';
import config from '../config';

// 任意のIDのアイキャッチ画像の取得、保存
function getArticleImage(payload: string): Action<string> {
  return {
    type: ArchiveActionType.GET_ARTICLE_IMAGE,
    payload,
  };
}

export function getArticleImageAsync(url: string): any {
  return fetch(url, {
    method: 'get',
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

function badRequestArchive(): Action {
  return {
    type: ArchiveActionType.BAD_REQUEST_ARCHIVE,
  };
}

// Action creator
export function fetchArticle(payload: any): Action<any> {
  return {
    type: ArchiveActionType.FETCH_ARTICLE,
    payload,
  };
}
// redux-thunk

export function fetchArticleAsync(callback: any, id: number) {
  return async (dispatch: Dispatch) => {
    return callback(id)
      .then((res: any) => {
        if (res === undefined) {
          return dispatch(badRequestArchive());
        }
        return dispatch(fetchArticle(res));
      })
      .then((res2: any) => {
        if (res2.payload !== undefined && res2.payload._links['wp:featuredmedia']) {
          return getArticleImageAsync(res2.payload._links['wp:featuredmedia'][0].href);
        }
        return false;
      })
      .then((res3: any) => {
        if (res3) {
          return dispatch(getArticleImage(res3.source_url));
        }
      });
  };
}

// TagIDからTag名取得
export function getTags(payload: any): Action<any> {
  return {
    type: ArchiveActionType.GET_TAGS,
    payload,
  };
}

export function getTagsAsync(array: number[]) {
  return async (dispatch: Dispatch) => {
    const tags = array.map((id: number) =>
      fetch(`${config.blogUrl}/wp-json/wp/v2/tags/${id}`, {
        method: 'get',
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
