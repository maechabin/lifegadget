import React from 'react';
import { connect } from 'react-redux';
import fetch from 'node-fetch';
import {
  searchArticleAsync,
  resetList,
  saveRoutingKey,
  getTagNameAsync,
} from '../actions/indexAction';
import config from '../config';

// view files
import IndexComp from '../components/index/IndexComp';

class Tag extends React.Component {
  static handleFetch(dispatch, renderProps) {
    return dispatch(
      searchArticleAsync(this.fetchData, renderProps.params.tag, renderProps.params.page),
    );
  }

  static fetchData(tag, page = 1) {
    const params = `?context=embed&tags=${tag}&per_page=${config.perPage}&page=${page}`;
    return fetch(`${config.blogUrl}/wp-json/wp/v2/posts${params}`, {
      method: 'get',
      mode: 'cors',
    })
      .then(Tag.handleErrors)
      .then((res) => {
        if (res.status === 200) {
          return [res.json(), res.headers._headers, tag];
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

  componentWillMount(nextProps) {
    return this.props.handleInit1(this.props.match.params.tag);
  }

  componentDidMount() {
    return [
      this.props.handleInit2(this.props.routingKey),
      this.props.handleFetch(
        this.props.match.params.tag,
        Tag.fetchData,
        this.props.match.params.page,
      ),
      this.callAdSense(),
    ];
  }

  componentWillUpdate(nextProps) {
    if (
      (nextprops.match.params.page !== '' &&
        nextprops.match.params.page !== this.props.match.params.page) ||
      nextprops.match.params.tag !== this.props.match.params.tag
    ) {
      return [
        this.props.handleInit1(nextprops.match.params.tag),
        this.props.handleFetch(
          nextprops.match.params.tag,
          Tag.fetchData,
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
    resetList: state.index.resetList,
    tagName: state.index.tagName,
    total: Number(state.index.total),
    totalPages: Number(state.index.totalPages),
    currentPage: state.index.currentPage,
    routingKey: state.routing.locationBeforeTransitions.key,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleFetch(tag, callback, page) {
      return dispatch(searchArticleAsync(callback, tag, page));
    },
    handleInit1(tag) {
      return [getTagNameAsync(tag)].map((action) => dispatch(action));
    },
    handleInit2(key) {
      return [resetList(), saveRoutingKey(key)].map((action) => dispatch(action));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tag);
