import { Dispatch } from 'redux';

import { Action, RootActionType } from './action.model';
import { fetchCategories, fetchUsers } from '../domains/wordpress';

export function setCategory(payload: any[]): Action<any[]> {
  return {
    type: RootActionType.SET_CATEGORY,
    payload,
  };
}

export function fetchCategoryAndDispatchSetCategoryAsync() {
  return async (dispatch: Dispatch<any>) => {
    const categories = await fetchCategories();
    dispatch(setCategory(categories));
  };
}

export function setUser(payload: any[]): Action<string[]> {
  return {
    type: RootActionType.SET_USER,
    payload,
  };
}

export function fetchUserAndDispatchSetUserAsync() {
  return async (dispatch: Dispatch) => {
    const users = await fetchUsers();
    dispatch(setUser(users));
  };
}

export function changeSearchKeyword(payload: string): Action<string> {
  return {
    type: RootActionType.CHANGE_SEARCH_KEYWORD,
    payload,
  };
}

export function setSearchKeyword(payload: string): Action<string> {
  return {
    type: RootActionType.SET_SEARCH_KEYWORD,
    payload,
  };
}
