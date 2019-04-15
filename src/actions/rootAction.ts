import { Dispatch } from 'redux';
import fetch from 'node-fetch';

import { Action, RootActionType } from './action.model';
import config from '../config';

export function fetchCategory(payload: string[]): Action<string[]> {
  return {
    type: RootActionType.FETCH_CATEGORY,
    payload,
  };
}

export function fetchCategoryAsync() {
  return async (dispatch: Dispatch) => {
    return fetch(`${config.blogUrl}/wp-json/wp/v2/categories`, {
      method: 'get',
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return console.dir(res);
      })
      .then((res) => dispatch(fetchCategory(res)));
  };
}

export function fetchUser(payload: string[]): Action<string[]> {
  return {
    type: RootActionType.FETCH_USER,
    payload,
  };
}

export function fetchUserAsync() {
  return async (dispatch: Dispatch) => {
    return fetch(`${config.blogUrl}/wp-json/wp/v2/users`, {
      method: 'get',
    })
      .then((res: any) => {
        if (res.status === 200) {
          return res.json();
        }
        return console.dir(res);
      })
      .then((res) => dispatch(fetchUser(res)));
  };
}

export function changeValue(payload: string): Action<string> {
  return {
    type: RootActionType.CHANGE_VALUE,
    payload,
  };
}

export function setSearchValue(payload: string): Action<string> {
  return {
    type: RootActionType.SET_SEARCH_VALUE,
    payload,
  };
}
