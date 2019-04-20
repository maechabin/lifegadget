import { IndexState } from '../state.model';
import { Action, IndexActionType } from '../actions/action.model';

export const indexReducer = (state: IndexState = {} as IndexState, action: Action) => {
  switch (action.type) {
    case IndexActionType.SET_ROUTING_KEY:
      return {
        ...state,
        routingKey: action.payload,
      };
    case IndexActionType.SET_IS_HIDDEN_INDEX_LIST_FOR_TRUE:
      return {
        ...state,
        isHiddenIndexList: true,
      };
    case IndexActionType.BAD_REQUEST_INDEX:
      return {
        ...state,
        badRequest: true,
      };
    case IndexActionType.SET_INDEX:
      return {
        ...state,
        index: action.payload.index,
        total: action.payload.total,
        totalPages: action.payload.totalPages,
        isHiddenIndexList: false,
        badRequest: false,
      };
    case IndexActionType.SET_TAG_NAME:
      return {
        ...state,
        tagName: action.payload,
      };
    default:
      return state;
  }
};
