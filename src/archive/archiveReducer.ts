import { ArchiveState } from '../state.model';
import { Action, ArchiveActionType } from '../action.model';

export const archiveReducer = (state: ArchiveState = {} as ArchiveState, action: Action) => {
  switch (action.type) {
    case ArchiveActionType.SET_ARTICLE:
      return {
        ...state,
        article: action.payload,
        currentId: action.payload.id,
        tags: [],
        gettedTag: false,
        badRequest: false,
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
        gettedTag: true,
      };
    case ArchiveActionType.BAD_REQUEST_ARCHIVE:
      return {
        ...state,
        badRequest: true,
      };
    default:
      return state;
  }
};
