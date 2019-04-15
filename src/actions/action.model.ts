/** Action型 */
export interface Action<T = any> {
  type: RootActionType;
  payload?: T;
}

export enum RootActionType {
  FETCH_CATEGORY,
  FETCH_USER,
  CHANGE_VALUE,
  SET_SEARCH_VALUE,
}
