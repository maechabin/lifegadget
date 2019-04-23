import { Dispatch } from 'redux';
import { Action, ArchiveActionType } from '../action.model';
import { fetchArchive, fetchTagNames, getEyeCatchImageUrl } from '../domains/wordpress';

function _setHasArchiveErrorToTrue(): Action {
  return {
    type: ArchiveActionType.SET_HAS_ARCHIVE_ERROR_TO_TRUE,
  };
}

// Action creator
function _setArticle(payload: any): Action<any> {
  return {
    type: ArchiveActionType.SET_ARTICLE,
    payload,
  };
}

// 任意のIDのアイキャッチ画像の取得、保存
function _setArticleImage(payload: string): Action<string> {
  return {
    type: ArchiveActionType.SET_ARTICLE_IMAGE,
    payload,
  };
}

// redux-thunk
export function fetchArticleAndDispatchSetAsync(query: {
  fetchMethod: typeof fetchArchive;
  archiveId: number;
}) {
  return async (dispatch: Dispatch) => {
    const response = await query.fetchMethod(query.archiveId);

    if (response == null) {
      dispatch(_setHasArchiveErrorToTrue());
    } else {
      dispatch(_setArticle(response));
    }

    if (response._links['wp:featuredmedia']) {
      const source_url = await getEyeCatchImageUrl(response._links['wp:featuredmedia'][0].href);
      dispatch(_setArticleImage(source_url));
    }
  };
}

// TagIDからTag名取得
function _setTags(payload: any): Action<any> {
  return {
    type: ArchiveActionType.SET_TAGS,
    payload,
  };
}

export function fetchTagsAndDispatchSetTagsAsync(tagIds: number[]) {
  return async (dispatch: Dispatch) => {
    const tags = await fetchTagNames(tagIds);
    dispatch(_setTags(tags));
  };
}
