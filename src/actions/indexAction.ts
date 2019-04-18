import { Dispatch } from 'redux';
import fetch from 'isomorphic-fetch';

import { Action, IndexActionType } from './action.model';
import config from '../config';
import {
  fetchIndex,
  fetchCategoryIndex,
  getEyeCatchImageUrl,
  fetchAuthorIndex,
} from '../domains/wordpress';
import { Index } from '../state.model';

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

type SetIndex = {
  index: Index[];
  total: string | null | undefined;
  totalPages: string | null | undefined;
};

function setIndex(payload: SetIndex): Action<SetIndex> {
  return {
    type: IndexActionType.SET_INDEX,
    payload,
  };
}

/**
 * Indexを取得して、setIndexアクションを呼ぶ
 * @param pageNumber ページ数
 */
export function setIndexAsync(query: {
  fetch: typeof fetchIndex | typeof fetchCategoryIndex | typeof fetchAuthorIndex;
  pageNumber: number;
  keyword?: any;
}) {
  return async (dispatch: Dispatch) => {
    const response = query.keyword
      ? await query.fetch(query.pageNumber, query.keyword)
      : await query.fetch(query.pageNumber, query.keyword);

    if (response == null) {
      dispatch(badRequestIndex());
    }

    const indexes = response && (await response.index.then((index: Index) => index));
    const total = response && response.total;
    const totalPages = response && response.totalPages;

    /** アイキャッチ画像のURLを取得してindexにマージ */
    const newIndexes: Index[] = await Promise.all(
      indexes.map(async (index: Index) => {
        let source_url = null;
        if (index._links['wp:featuredmedia']) {
          source_url = await getEyeCatchImageUrl(index._links['wp:featuredmedia'][0].href);
        }
        return { ...index, source_url };
      }),
    );

    dispatch(
      setIndex({
        index: newIndexes,
        total,
        totalPages,
      }),
    );
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
          .then((index) => dispatch(setIndex({ index, total: null, totalPages: null }))),
      );
    });
  };
}
