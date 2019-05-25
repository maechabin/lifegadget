import { ArchiveState } from './archiveState';
import { Action, ArchiveActionType } from '../action.model';
import { fetchArticleAndDispatchSetAsync } from './archiveAction';

export const archiveReducer = (state: ArchiveState = {} as ArchiveState, action: Action) => {
  switch (action.type) {
    case ArchiveActionType.SET_ARTICLE:
      const article = {
        ...state.article,
        [action.payload.id]: action.payload,
      };
      return {
        ...state,
        article,
        currentId: action.payload.id,
        tags: [],
        hasTagNames: false,
        hasError: false,
      };
    case ArchiveActionType.SET_ARTICLE_IMAGE:
      return {
        ...state,
        articleImage: action.payload,
      };
    case ArchiveActionType.SET_TAGS:
      return {
        ...state,
        tags: action.payload,
        hasTagNames: true,
      };
    case ArchiveActionType.SET_HAS_ARCHIVE_ERROR_TO_TRUE:
      return {
        ...state,
        hasError: true,
      };
    default:
      return state;
  }
};
