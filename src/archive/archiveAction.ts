import { Dispatch } from 'redux';

import { Action, ArchiveActionType } from '../action.model';
import { TagName } from './archiveState';
import { Archive, fetchArchive, fetchTagNames, getEyeCatchImageUrl } from '../domains/wordpress';

function _setHasArchiveErrorToTrue(): Action {
  return {
    type: ArchiveActionType.SET_HAS_ARCHIVE_ERROR_TO_TRUE,
  };
}

// Action creator
function _setArticle(payload: Archive): Action<Archive> {
  return {
    type: ArchiveActionType.SET_ARTICLE,
    payload,
  };
}

// TagIDからTag名取得
function _setTags(payload: {
  archiveId: number;
  tagNames: TagName[];
}): Action<{
  archiveId: number;
  tagNames: TagName[];
}> {
  return {
    type: ArchiveActionType.SET_TAGS,
    payload,
  };
}

// 任意のIDのアイキャッチ画像の取得、保存
function _setArticleImage(payload: {
  archiveId: number;
  source_url: string | null;
}): Action<{
  archiveId: number;
  source_url: string | null;
}> {
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
  return async (dispatch: Dispatch, getState?: any) => {
    const { archive } = getState();
    let response: Archive | null;

    if (archive && archive.article && archive.article[query.archiveId]) {
      return;
    } else {
      response = await query.fetchMethod(query.archiveId);
    }

    if (response == null) {
      dispatch(_setHasArchiveErrorToTrue());
      return;
    } else {
      dispatch(_setArticle(response));
    }

    if (response.tags.length > 0) {
      const tagNames = await fetchTagNames(response.tags);
      dispatch(
        _setTags({
          archiveId: response.id,
          tagNames,
        }),
      );
    }

    if (response._links['wp:featuredmedia']) {
      const source_url = await getEyeCatchImageUrl(response._links['wp:featuredmedia'][0].href);
      dispatch(
        _setArticleImage({
          archiveId: response.id,
          source_url,
        }),
      );
    }
  };
}
