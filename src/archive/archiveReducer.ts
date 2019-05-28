import { ArchiveState, Articles } from './archiveState';
import { Action, ArchiveActionType } from '../action.model';

export const archiveReducer = (state: ArchiveState = {} as ArchiveState, action: Action) => {
  switch (action.type) {
    case ArchiveActionType.SET_ARTICLE:
      const article = {
        ...state.article,
        [action.payload.id]: {
          id: action.payload.id,
          author: action.payload.author,
          categories: action.payload.categories,
          content: action.payload.content.rendered || action.payload.content,
          date: action.payload.date,
          eyecatch: null,
          tags: action.payload.tags,
          tagNames: null,
          title: action.payload.title.rendered || action.payload.title,
          _links: action.payload._links,
        },
      };
      return {
        ...state,
        article,
        currentId: action.payload.id,
        hasError: false,
      };
    case ArchiveActionType.SET_TAGS:
      return {
        ...state,
        article: {
          ...state.article,
          [action.payload.archiveId]: {
            ...(state && state.article && state.article[action.payload.archiveId]),
            tagNames: action.payload.tagNames,
          },
        },
      };
    case ArchiveActionType.SET_ARTICLE_IMAGE:
      return {
        ...state,
        article: {
          ...state.article,
          [action.payload.archiveId]: {
            ...(state && state.article && state.article[action.payload.archiveId]),
            eyecatch: action.payload.source_url,
          },
        },
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
