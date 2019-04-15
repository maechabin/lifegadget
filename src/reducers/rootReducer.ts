import { RootState } from '../state.model';
import { RootActionType, Action } from '../actions/action.model';

export const rootReducer = (state: RootState = {} as RootState, action: Action) => {
  switch (action.type) {
    case RootActionType.CHANGE_VALUE:
      return {
        ...state,
        inputValue: action.payload,
      };
    case RootActionType.SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.payload,
      };
    case RootActionType.FETCH_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case RootActionType.FETCH_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
