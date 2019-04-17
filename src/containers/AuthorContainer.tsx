import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State } from '../state.model';
import { searchArticleAsync, resetList, saveRoutingKey } from '../actions/indexAction';
import { fetchAuthorIndex } from '../domains/wordpress';

// view files
import Index from '../components/index/Index';

declare const window: any;

class AuthorContainer extends React.Component<any, never> {
  static handleFetch(dispatch: any, renderProps: any) {
    dispatch(
      searchArticleAsync(fetchAuthorIndex, renderProps.params.author, renderProps.params.page),
    );
  }

  // static fetchData(author: any, page: number = 1) {
  //   const params = `?context=embed&author=${author}&per_page=${config.perPage}&page=${page}`;
  //   return fetch(`${config.blogUrl}/wp-json/wp/v2/posts${params}`, {
  //     method: 'get',
  //   })
  //     .then(AuthorContainer.handleErrors)
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
      this.props.match.params.author,
      fetchAuthorIndex,
      this.props.match.params.page,
    );
    this.callAdSense();
  }

  componentWillUpdate(nextProps: any) {
    if (
      nextProps.match.params.page !== '' &&
      nextProps.match.params.page !== this.props.match.params.page
    ) {
      this.props.handleFetch(
        this.props.match.params.author,
        fetchAuthorIndex,
        nextProps.match.params.page,
      );
    }
  }

  render() {
    return <Index {...this.props} />;
  }
}

function mapStateToProps(state: State & any) {
  return {
    index: state.index.index,
    badRequest: state.index.badRequest,
    author: state.root.user,
    resetList: state.index.resetList,
    total: Number(state.index.total),
    totalPages: Number(state.index.totalPages),
    currentPage: state.index.currentPage,
    pathname: state.routing.locationBeforeTransitions.pathname,
    routingKey: state.routing.locationBeforeTransitions.key,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    handleFetch(author: any, callback: any, page: any) {
      dispatch(searchArticleAsync(callback, author, page));
    },
    handleInit(key: any) {
      [resetList(), saveRoutingKey(key)].map((action) => dispatch(action));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthorContainer);
