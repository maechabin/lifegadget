import React from 'react';
import { connect } from 'react-redux';
import fetch from 'node-fetch';
import { searchArticleAsync, resetList, saveRoutingKey } from '../actions/indexAction';
import config from '../config';

// view files
import Index from '../components/index/Index';

declare const window: any;

class CategoryContainer extends React.Component<any, any> {
  static handleFetch(dispatch: any, renderProps: any) {
    return dispatch(
      searchArticleAsync(this.fetchData, renderProps.params.category, renderProps.params.page),
    );
  }

  static fetchData(category: any, page = 1) {
    const params = `?context=embed&categories=${category}&per_page=${config.perPage}&page=${page}`;
    return fetch(`${config.blogUrl}/wp-json/wp/v2/posts${params}`, {
      method: 'get',
    })
      .then(CategoryContainer.handleErrors)
      .then((res) => {
        if (res.status === 200) {
          return [res.json(), res.headers._headers];
        }
        return console.log(res);
      })
      .catch(() => console.log('bad request'));
  }

  static handleErrors(response: any) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

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
    return [
      this.props.handleInit(this.props.routingKey),
      this.props.handleFetch(
        this.props.match.params.category,
        CategoryContainer.fetchData,
        this.props.match.params.page,
      ),
      this.callAdSense(),
    ];
  }

  componentWillUpdate(nextProps: any) {
    if (
      nextProps.match.params.page !== '' &&
      nextProps.match.params.page !== this.props.match.params.page
    ) {
      return [
        this.props.handleFetch(
          this.props.match.params.category,
          CategoryContainer.fetchData,
          nextProps.match.params.page,
        ),
      ];
    }
    if (nextProps.pathname !== this.props.pathname) {
      return [
        this.props.handleFetch(
          nextProps.match.params.category,
          CategoryContainer.fetchData,
          nextProps.match.params.page,
        ),
      ];
    }
    return false;
  }

  render() {
    return <Index {...this.props} />;
  }
}

function mapStateToProps(state: any) {
  return {
    index: state.index.index,
    badRequest: state.index.badRequest,
    category: state.root.category,
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
    handleFetch(category: any, callback: any, page: any) {
      return dispatch(searchArticleAsync(callback, category, page));
    },
    handleInit(key: any) {
      return [resetList(), saveRoutingKey(key)].map((action) => dispatch(action));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryContainer);
