import { Dispatch } from 'redux';
import fetch from 'node-fetch';

import { Action, IndexActionType } from './action.model';
import config from '../config';
import { fetchIndex, getEyeCatchImageUrl } from '../domains/wordpress';
import { Index } from '../state.model';

export function resetList() {
  return {
    type: IndexActionType.RESET_LIST,
  };
}

export function saveRoutingKey(payload: string): Action<string> {
  return {
    type: IndexActionType.SAVE_ROUTING_KEY,
    payload,
  };
}

export function setCurrentPageNumber(payload: number): Action<number> {
  return {
    type: IndexActionType.SET_CURRENT_PAGE_NUMBER,
    payload,
  };
}

function getTagName(payload: string): Action<string> {
  return {
    type: IndexActionType.GET_TAG_NAME,
    payload,
  };
}

export function getTagNameAsync(tag: number) {
  return async (dispatch: Dispatch) => {
    return fetch(`${config.blogUrl}/wp-json/wp/v2/tags?include=${tag}&context=embed`, {
      method: 'get',
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return console.dir(res);
      })
      .then((res) => {
        if (typeof res[0].name === 'string') {
          return dispatch(getTagName(res[0].name));
        }
      });
  };
}

function badRequestIndex(): Action {
  return {
    type: IndexActionType.BAD_REQUEST_INDEX,
  };
}

function setIndex(payload: any): Action<any> {
  return {
    type: IndexActionType.SET_INDEX,
    payload,
  };
}

// redux-thunk
export function setIndexAsync(pageName: number = 1) {
  return async (dispatch: Dispatch) => {
    const response = await fetchIndex(pageName);

    console.log(response);

    if (response == undefined) {
      dispatch(badRequestIndex());
    }

    // fetchIndex(pageName).then((res: any) => {
    //   if (res === undefined) {
    //     dispatch(badRequestIndex());
    //   }
    //   Promise.resolve(res[0]).then((indexes: any) => {
    //     Promise.all(
    //       indexes.map(
    //         (index: Index): void => {
    //           if (index._links['wp:featuredmedia']) {
    //             getEyeCatchImageUrl(index._links['wp:featuredmedia'][0].href);
    //           }
    //         },
    //       ),
    //     )
    //       .then((res4) => {
    //         return indexes.map((index: Index, i: number) => Object.assign({}, index, res4[i]));
    //       })
    //       .then((index) => dispatch(setIndex({ index, page: res[1] })));
    //   });
    // });
  };
}

export function searchArticleAsync(callback: any, keyword: string, page: number) {
  return async (dispatch: Dispatch) => {
    return callback(keyword, page).then((res: any) => {
      if (res === undefined) {
        return dispatch(badRequestIndex());
      }
      Promise.resolve(res[0]).then((res2) =>
        Promise.all(
          res2.map((res3: any) => {
            if (res3._links['wp:featuredmedia']) {
              return getEyeCatchImageUrl(res3._links['wp:featuredmedia'][0].href);
            }
            return false;
          }),
        )
          .then((res4) => res2.map((obj: any, i: number) => Object.assign({}, obj, res4[i])))
          .then((index) => dispatch(setIndex({ index, page: res[1] }))),
      );
    });
  };
}
