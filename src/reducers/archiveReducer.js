import { FETCH_ARTICLE, GET_TAGS, GET_ARTICLE_IMAGE, BAD_REQUEST_ARCHIVE } from '../actions/archiveAction';

export const archiveReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ARTICLE:
      return Object.assign({}, state, {
        article: action.payload,
        currentId: action.payload.id,
        tags: [],
        gettedTag: false,
        badRequest: false,
      });
    case GET_TAGS:
      return Object.assign({}, state, {
        tags: action.payload,
        gettedTag: true,
      });
    case BAD_REQUEST_ARCHIVE:
      return Object.assign({}, state, {
        badRequest: true,
      });
    case GET_ARTICLE_IMAGE:
      return Object.assign({}, state, {
        articleImage: action.payload,
      });
    default:
      return state;
  }
};
