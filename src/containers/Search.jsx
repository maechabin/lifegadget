import React from 'react';
import { connect } from 'react-redux';
import fetch from 'node-fetch';
import { searchArticleAsync, resetList, saveRoutingKey } from '../actions/indexAction';
import config from '../config';

// view files
import IndexComp from '../components/index/IndexComp';

class Search extends React.Component {
  static handleFetch(dispatch, renderProps) {
    return dispatch(
      searchArticleAsync(this.fetchData, renderProps.params.keyword, renderProps.params.page),
    );
  }

  static fetchData(keyword, page = 1) {
    const params = `?context=embed&search=${keyword}&per_page=${config.perPage}&page=${page}`;
    return fetch(`${config.blogUrl}/wp-json/wp/v2/posts${params}`, {
      method: 'get',
      mode: 'cors',
    })
      .then(Search.handleErrors)
      .then((res) => {
        if (res.status === 200) {
          return [res.json(), res.headers._headers];
        }
        return console.dir(res);
      })
      .catch(() => console.log('bad request'));
  }

  static handleErrors(response) {
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
        this.props.match.params.keyword,
        Search.fetchData,
        this.props.match.params.page,
      ),
      this.callAdSense(),
    ];
  }

  componentWillUpdate(nextProps) {
    if (nextProps.keyword !== '' && nextProps.keyword !== this.props.match.params.keyword) {
      return this.props.handleFetch(
        nextProps.keyword,
        Search.fetchData,
        this.props.match.params.page,
      );
    }
    if (
      nextprops.match.params.page !== '' &&
      nextprops.match.params.page !== this.props.match.params.page
    ) {
      return [
        this.props.handleFetch(
          this.props.match.params.keyword,
          Search.fetchData,
          nextprops.match.params.page,
        ),
      ];
    }
    return false;
  }

  render() {
    return <IndexComp {...this.props} />;
  }
}

// Connect to Redux
function mapStateToProps(state) {
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
function mapDispatchToProps(dispatch) {
  return {
    handleFetch(keyword, callback, page) {
      return dispatch(searchArticleAsync(callback, keyword, page));
    },
    handleInit(key) {
      return [resetList(), saveRoutingKey(key)].map((action) => dispatch(action));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
