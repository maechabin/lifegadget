import { Dispatch } from 'redux';

import { Action, RootActionType } from '../action.model';
import { fetchCategories, fetchUsers } from '../domains/wordpress';

function _setCategory(payload: any[]): Action<any[]> {
  return {
    type: RootActionType.SET_CATEGORY,
    payload,
  };
}

export function fetchCategoryAndDispatchSetCategoryAsync() {
  return async (dispatch: Dispatch<any>) => {
    const categories = await fetchCategories();
    dispatch(_setCategory(categories));
  };
}

function _setUser(payload: any[]): Action<string[]> {
  return {
    type: RootActionType.SET_USER,
    payload,
  };
}

export function fetchUserAndDispatchSetUserAsync() {
  return async (dispatch: Dispatch) => {
    const users = await fetchUsers();
    dispatch(_setUser(users));
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
