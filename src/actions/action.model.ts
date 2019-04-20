/** Action型 */
export interface Action<T = any> {
  type: RootActionType | IndexActionType | ArchiveActionType;
  payload?: T;
}

export enum RootActionType {
  CHANGE_SEARCH_KEYWORD,
  SET_SEARCH_KEYWORD,
  SET_CATEGORY,
  SET_USER,
}

export enum IndexActionType {
  SET_INDEX,
  BAD_REQUEST_INDEX,
  SET_IS_HIDDEN_INDEX_LIST_FOR_TRUE,
  SET_ROUTING_KEY,
  SET_TAG_NAME,
}

export enum ArchiveActionType {
  FETCH_ARTICLE,
  GET_TAGS,
  GET_ARTICLE_IMAGE,
  BAD_REQUEST_ARCHIVE,
}
