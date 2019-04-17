import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State } from '../state.model';
import { searchArticleAsync, resetList, saveRoutingKey } from '../actions/indexAction';
import { fetchKeywordIndex } from '../domains/wordpress';

// view files
import Index from '../components/index/Index';

declare const window: any;

class SearchContainer extends React.Component<any, never> {
  static handleFetch(dispatch: any, renderProps: any) {
    return dispatch(
      searchArticleAsync(fetchKeywordIndex, renderProps.params.keyword, renderProps.params.page),
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

  callAdSense() {
    const ads = document.querySelectorAll('.adsbygoogle');
    if (ads.length > 0) {
      try {
        ads.forEach(() => {
          return (window.adsbygoogle = window.adsbygoogle || []).push({});
        });
      } catch (error) {}
    }
  }

  componentDidMount() {
    this.props.handleInit(this.props.routingKey);
    this.props.handleFetch(
      this.props.match.params.keyword,
      fetchKeywordIndex,
      this.props.match.params.page,
    );
    this.callAdSense();
  }

  componentWillUpdate(nextProps: any) {
    if (nextProps.keyword !== '' && nextProps.keyword !== this.props.match.params.keyword) {
      this.props.handleFetch(nextProps.keyword, fetchKeywordIndex, this.props.match.params.page);
    }
    if (
      nextProps.match.params.page !== '' &&
      nextProps.match.params.page !== this.props.match.params.page
    ) {
      this.props.handleFetch(
        this.props.match.params.keyword,
        fetchKeywordIndex,
        nextProps.match.params.page,
      );
    }
  }

  render() {
    return <Index {...this.props} />;
  }
}

// Connect to Redux
function mapStateToProps(state: State & any) {
  return {
    index: state.index.index,
    badRequest: state.index.badRequest,
    keyword: state.root.searchValue,
    resetList: state.index.resetList,
    total: Number(state.index.total),
    totalPages: Number(state.index.totalPages),
    currentPage: state.index.currentPage,
    routingKey: state.routing.locationBeforeTransitions.key,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    handleFetch(keyword: string, callback: any, page: any) {
      dispatch(searchArticleAsync(callback, keyword, page));
    },
    handleInit(key: any) {
      [resetList(), saveRoutingKey(key)].map((action) => dispatch(action));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchContainer);
