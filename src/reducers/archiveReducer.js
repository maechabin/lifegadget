import { FETCH_ARTICLE, GET_TAGS } from '../actions/archiveAction';

export const archiveReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ARTICLE:
      return Object.assign({}, state, {
        article: action.payload,
        currentId: action.payload.id,
        tags: [],
        gettedTag: false,
      });
    case GET_TAGS:
      return Object.assign({}, state, {
        tags: action.payload,
        gettedTag: true,
      });
    default:
      return state;
  }
};
