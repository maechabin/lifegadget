import { Dispatch } from 'redux';

import { Action, ArchiveActionType } from '../action.model';
import { TagName } from './archiveState';
import { Archive, fetchArchive, fetchTagNames, getEyeCatchImageUrl } from '../domains/wordpress';

type SetTags = {
  archiveId: number;
  tagNames: TagName[];
};

type SetArticleImage = {
  archiveId: number;
  source_url: string | null;
};

/** エラー状態アクション */
function _setHasArchiveErrorToTrue(): Action {
  return {
    type: ArchiveActionType.SET_HAS_ARCHIVE_ERROR_TO_TRUE,
  };
}

/** 記事情報アクション */
function _setArticle(payload: Archive): Action<Archive> {
  return {
    type: ArchiveActionType.SET_ARTICLE,
    payload,
  };
}

/** タグ名アクション */
function _setTags(payload: SetTags): Action<SetTags> {
  return {
    type: ArchiveActionType.SET_TAGS,
    payload,
  };
}

/** アイキャッチ画像アクション */
function _setArticleImage(payload: SetArticleImage): Action<SetArticleImage> {
  return {
    type: ArchiveActionType.SET_ARTICLE_IMAGE,
    payload,
  };
}

/**
 * redux-thunk
 * 記事情報を取得してそれぞれのアクションを使ってdispatchする
 */
export function fetchArticleAndDispatchSetAsync(query: {
  fetchMethod: typeof fetchArchive;
  archiveId: number;
}) {
  return async (dispatch: Dispatch, getState?: any) => {
    const { archive } = getState(); 

    if (archive && archive.article && archive.article[query.archiveId]) {
      return;
    }

    const response = await query.fetchMethod(query.archiveId);

    if (response == null) {
      dispatch(_setHasArchiveErrorToTrue());
      return;
    }

    dispatch(_setArticle(response));

    if (response.tags.length > 0) {
      const tagNames = await fetchTagNames(response.tags);
      dispatch(
        _setTags({
          archiveId: query.archiveId,
          tagNames,
        }),
      );
    }

    if (response._links['wp:featuredmedia']) {
      const source_url = await getEyeCatchImageUrl(response._links['wp:featuredmedia'][0].href);
      dispatch(
        _setArticleImage({
          archiveId: query.archiveId,
          source_url,
        }),
      );
    }
  };
}
