import { RootState } from './rootState';
import { RootActionType, Action } from '../action.model';

export const rootReducer = (state: RootState = {} as RootState, action: Action) => {
  switch (action.type) {
    case RootActionType.CHANGE_SEARCH_KEYWORD:
      return {
        ...state,
        inputValue: action.payload,
      };
    case RootActionType.SET_SEARCH_KEYWORD:
      return {
        ...state,
        searchValue: action.payload,
      };
    case RootActionType.SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case RootActionType.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case RootActionType.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
