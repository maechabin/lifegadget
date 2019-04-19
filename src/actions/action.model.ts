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
  RESET_LIST,
  SAVE_ROUTING_KEY,
  SET_CURRENT_PAGE_NUMBER,
  GET_TAG_NAME,
}

export enum ArchiveActionType {
  FETCH_ARTICLE,
  GET_TAGS,
  GET_ARTICLE_IMAGE,
  BAD_REQUEST_ARCHIVE,
}
