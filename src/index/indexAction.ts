import { Dispatch } from 'redux';

import { Action, IndexActionType } from '../action.model';
import {
  fetchIndex,
  fetchCategoryIndex,
  getEyeCatchImageUrl,
  fetchAuthorIndex,
  fetchKeywordIndex,
  fetchTagIndex,
  fetchTagName,
} from '../domains/wordpress';
import { Index } from './indexState';

export function setIsHiddenIndexListForTrue() {
  return {
    type: IndexActionType.SET_IS_HIDDEN_INDEX_LIST_FOR_TRUE,
  };
}

export function setRoutingKey(payload: string): Action<string> {
  return {
    type: IndexActionType.SET_ROUTING_KEY,
    payload,
  };
}

function _setTagName(payload: string): Action<string> {
  return {
    type: IndexActionType.SET_TAG_NAME,
    payload,
  };
}

export function fetchTagNameAndDispatchSetTanNameAsync(tagId: number) {
  return async (dispatch: Dispatch) => {
    const tagName = await fetchTagName(tagId);
    dispatch(_setTagName(tagName));
  };
}

function _setHasIndexErrorToTrue(): Action {
  return {
    type: IndexActionType.SET_HAS_INDEX_ERROR_TO_TRUE,
  };
}

type SetIndex = {
  index: Index[];
  total: string | null | undefined;
  totalPages: string | null | undefined;
};

type SetIndexQuery = {
  fetchMethod:
    | typeof fetchIndex
    | typeof fetchCategoryIndex
    | typeof fetchAuthorIndex
    | typeof fetchKeywordIndex
    | typeof fetchTagIndex;
  pageNumber: number;
  keyword?: any;
};

/**
 * IndexをStateに保存する
 * @param payload Index情報
 */
function _setIndex(payload: SetIndex): Action<SetIndex> {
  return {
    type: IndexActionType.SET_INDEX,
    payload,
  };
}

/**
 * Indexを取得して、setIndexアクションを呼ぶ
 * @param pageNumber ページ数
 */
export function fetchIndexAndDispatchSetIndexAsync(query: SetIndexQuery) {
  return async (dispatch: Dispatch) => {
    const response = await query.fetchMethod(
      query.pageNumber,
      query.keyword ? query.keyword : null,
    );

    if (response == null) {
      return dispatch(_setHasIndexErrorToTrue());
    }

    const indexes = await response.index.then((index: Index[]) => index);
    const total = response.total;
    const totalPages = response.totalPages;

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
      _setIndex({
        index: newIndexes,
        total,
        totalPages,
      }),
    );
  };
}
