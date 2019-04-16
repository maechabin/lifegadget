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
import Index from '../components/index/Index';

declare const window: any;

class TagContainer extends React.Component<any, any> {
  static handleFetch(dispatch: any, renderProps: any) {
    return dispatch(
      searchArticleAsync(this.fetchData, renderProps.params.tag, renderProps.params.page),
    );
  }

  static fetchData(tag: any, page = 1) {
    const params = `?context=embed&tags=${tag}&per_page=${config.perPage}&page=${page}`;
    return fetch(`${config.blogUrl}/wp-json/wp/v2/posts${params}`, {
      method: 'get',
    })
      .then(TagContainer.handleErrors)
      .then((res) => {
        if (res.status === 200) {
          return [res.json(), res.headers._headers, tag];
        }
        return console.dir(res);
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

  /**
   * @fix componentWillMountの置き換え
   */
  // componentWillMount(nextProps: any) {
  //   return this.props.handleInit1(this.props.match.params.tag);
  // }

  componentDidMount() {
    return [
      this.props.handleInit2(this.props.routingKey),
      this.props.handleFetch(
        this.props.match.params.tag,
        TagContainer.fetchData,
        this.props.match.params.page,
      ),
      this.callAdSense(),
    ];
  }

  componentWillUpdate(nextProps: any) {
    if (
      (nextProps.match.params.page !== '' &&
        nextProps.match.params.page !== this.props.match.params.page) ||
      nextProps.match.params.tag !== this.props.match.params.tag
    ) {
      return [
        this.props.handleInit1(nextProps.match.params.tag),
        this.props.handleFetch(
          nextProps.match.params.tag,
          TagContainer.fetchData,
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

// Connect to Redux
function mapStateToProps(state: any) {
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
function mapDispatchToProps(dispatch: any) {
  return {
    handleFetch(tag: any, callback: any, page: any) {
      return dispatch(searchArticleAsync(callback, tag, page));
    },
    handleInit1(tag: any) {
      return [getTagNameAsync(tag)].map((action) => dispatch(action));
    },
    handleInit2(key: any) {
      return [resetList(), saveRoutingKey(key)].map((action) => dispatch(action));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TagContainer);
