import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State } from '../state.model';
import {
  fetchIndexAndDispatchSetIndexAsync,
  resetList,
  saveRoutingKey,
  getTagNameAsync,
} from '../actions/indexAction';
import { fetchTagIndex } from '../domains/wordpress';

// view files
import Index from '../components/index/Index';

declare const window: any;

class TagContainer extends React.Component<any, never> {
  static handleFetch(dispatch: Dispatch<any>, renderProps: any) {
    dispatch(
      fetchIndexAndDispatchSetIndexAsync({
        fetchMethod: fetchTagIndex,
        pageNumber: renderProps.params.page,
        keyword: renderProps.params.tag,
      }),
    );
  }

  // static fetchData(tag: number, page: number = 1) {
  //   const params = `?context=embed&tags=${tag}&per_page=${config.perPage}&page=${page}`;
  //   return fetch(`${config.blogUrl}/wp-json/wp/v2/posts${params}`, {
  //     method: 'get',
  //   })
  //     .then(TagContainer.handleErrors)
  //     .then((res) => {
  //       if (res.status === 200) {
  //         return [res.json(), res.headers._headers, tag];
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

  /**
   * @fix componentWillMountの置き換え
   */
  // componentWillMount(nextProps: any) {
  //   return this.props.handleInit1(this.props.match.params.tag);
  // }

  componentDidMount() {
    this.props.handleInit2(this.props.routingKey);
    this.props.dispatchSetIndexAsync(
      fetchTagIndex,
      this.props.match.params.page,
      this.props.match.params.tag,
    );
    this.callAdSense();
  }

  componentWillUpdate(nextProps: any) {
    if (
      (nextProps.match.params.page !== '' &&
        nextProps.match.params.page !== this.props.match.params.page) ||
      nextProps.match.params.tag !== this.props.match.params.tag
    ) {
      this.props.handleInit1(nextProps.match.params.tag);
      this.props.dispatchSetIndexAsync(
        fetchTagIndex,
        nextProps.match.params.page,
        nextProps.match.params.tag,
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
    isHiddenIndexListList: state.index.isHiddenIndexList,
    tagName: state.index.tagName,
    total: Number(state.index.total),
    totalPages: Number(state.index.totalPages),
    currentPage: state.index.currentPage,
    // routingKey: state.routing.locationBeforeTransitions.key,
  };
}
function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    dispatchSetIndexAsync(fetchMethod: typeof fetchTagIndex, pageNumber: number, tagId: number) {
      dispatch(fetchIndexAndDispatchSetIndexAsync({ fetchMethod, pageNumber, keyword: tagId }));
    },
    handleInit1(tag: any) {
      [getTagNameAsync(tag)].map((action) => dispatch(action));
    },
    handleInit2(key: any) {
      [resetList(), saveRoutingKey(key)].map((action) => dispatch(action));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TagContainer);
