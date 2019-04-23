import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State } from '../state.model';
import {
  fetchIndexAndDispatchSetIndexAsync,
  setIsHiddenIndexListForTrue,
  setRoutingKey,
} from '../actions/indexAction';
import { fetchKeywordIndex } from '../domains/wordpress';

// view files
import Index from '../components/index/Index';

class SearchContainer extends React.Component<any, never> {
  static handleFetch(dispatch: Dispatch<any>, renderProps: any) {
    return dispatch(
      fetchIndexAndDispatchSetIndexAsync({
        fetchMethod: fetchKeywordIndex,
        pageNumber: renderProps.params.page,
        keyword: renderProps.params.keyword,
      }),
    );
  }

  // static fetchData(keyword: string, page: number = 1) {
  //   const params = `?context=embed&search=${keyword}&per_page=${config.perPage}&page=${page}`;
  //   return fetch(`${config.blogUrl}/wp-json/wp/v2/posts${params}`, {
  //     method: 'get',
  //   })
  //     .then(SearchContainer.handleErrors)
  //     .then((res) => {
  //       if (res.status === 200) {
  //         return [res.json(), res.headers._headers];
  //       }
  //       return console.dir(res);
  //     })
  //     .catch(() => console.log('bad request'));
  // }

  componentDidMount() {
    this.props.dispatchActions(this.props.routingKey);
    this.props.dispatchSetIndexAsync(
      fetchKeywordIndex,
      this.props.match.params.page,
      this.props.match.params.keyword,
    );
  }

  componentWillUpdate(nextProps: any) {
    if (nextProps.keyword !== '' && nextProps.keyword !== this.props.match.params.keyword) {
      this.props.dispatchSetIndexAsync(
        fetchKeywordIndex,
        this.props.match.params.page,
        nextProps.keyword,
      );
    }
    if (
      nextProps.match.params.page !== '' &&
      nextProps.match.params.page !== this.props.match.params.page
    ) {
      this.props.dispatchSetIndexAsync(
        fetchKeywordIndex,
        nextProps.match.params.page,
        this.props.match.params.keyword,
      );
    }
  }

  render() {
    return <Index {...this.props} />;
  }
}

// Connect to Redux
function mapStateToProps(state: State) {
  return {
    index: state.index.index,
    badRequest: state.index.badRequest,
    keyword: state.root.searchValue,
    isHiddenIndexList: state.index.isHiddenIndexList,
    total: Number(state.index.total),
    totalPages: Number(state.index.totalPages),
    currentPage: state.index.currentPage,
    routingKey: state.router.location.key,
  };
}
function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    dispatchSetIndexAsync(
      fetchMethod: typeof fetchKeywordIndex,
      pageNumber: number,
      keyword: string,
    ) {
      dispatch(fetchIndexAndDispatchSetIndexAsync({ fetchMethod, pageNumber, keyword }));
    },
    dispatchActions(key: any) {
      [setIsHiddenIndexListForTrue(), setRoutingKey(key)].forEach((action) => dispatch(action));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchContainer);
