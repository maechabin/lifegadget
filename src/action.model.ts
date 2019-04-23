/** Action型 */
export interface Action<T = any> {
  type: RootActionType | IndexActionType | ArchiveActionType;
  payload?: T;
}

export enum RootActionType {
  CHANGE_SEARCH_KEYWORD = 'CHANGE_SEARCH_KEYWORD',
  SET_SEARCH_KEYWORD = 'SET_SEARCH_KEYWORD',
  SET_CATEGORY = 'SET_CATEGORY',
  SET_USER = 'SET_USER',
}

export enum IndexActionType {
  SET_INDEX = 'SET_INDEX',
  BAD_REQUEST_INDEX = 'BAD_REQUEST_INDEX',
  SET_IS_HIDDEN_INDEX_LIST_FOR_TRUE = 'SET_IS_HIDDEN_INDEX_LIST_FOR_TRUE',
  SET_ROUTING_KEY = 'SET_ROUTING_KEY',
  SET_TAG_NAME = 'SET_TAG_NAME',
}

export enum ArchiveActionType {
  SET_ARTICLE = 'SET_ARTICLE',
  SET_TAGS = 'SET_TAGS',
  SET_ARTICLE_IMAGE = 'SET_ARTICLE_IMAGE',
  BAD_REQUEST_ARCHIVE = 'BAD_REQUEST_ARCHIVE',
}
