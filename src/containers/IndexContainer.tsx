import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State } from '../state.model';
import { fetchIndex } from '../domains/wordpress';
import {
  fetchIndexAndDispatchSetIndexAsync,
  setIsHiddenIndexListForTrue,
  setRoutingKey,
} from '../actions/indexAction';

// view files
import Index from '../components/index/Index';

declare const window: any;

class IndexContainer extends React.PureComponent<any, never> {
  static handleFetch(dispatch: Dispatch<any>, renderProps: any) {
    dispatch(
      fetchIndexAndDispatchSetIndexAsync({ fetchMethod: fetchIndex, pageNumber: renderProps.path }),
    );
  }

  // static fetchData(page: number = 1) {
  //   const params = `?context=embed&per_page=${config.perPage}&page=${page}`;
  //   return fetch(`${config.blogUrl}/wp-json/wp/v2/posts${params}`, {
  //     method: 'get',
  //   }).then((res: any) => {
  //     if (res.status === 200) {
  //       return [res.json(), res.headers._headers];
  //     }
  //     return console.log(res);
  //   });
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
    this.props.dispatchActions(this.props.routingKey);
    this.props.dispatchSetIndexAsync(fetchIndex, this.props.match.params.page);
    this.callAdSense();
  }

  componentDidUpdate(nextProps: any) {
    if (
      nextProps.match.params.page !== '' &&
      nextProps.match.params.page !== this.props.match.params.page
    ) {
      this.props.dispatchActions(this.props.routingKey);
      this.props.dispatchSetIndexAsync(fetchIndex, nextProps.match.params.page);
    }
  }

  render() {
    return <Index {...this.props} />;
  }
}

// Connect to Redux
function mapStateToProps(state: State) {
  return {
    badRequest: state.index.badRequest,
    index: state.index.index,
    isHiddenIndexList: state.index.isHiddenIndexList,
    total: Number(state.index.total),
    totalPages: Number(state.index.totalPages),
    currentPage: state.index.currentPage,
    // routingKey: state.routing.locationBeforeTransitions.key,
  };
}
function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    dispatchSetIndexAsync(fetchMethod: typeof fetchIndex, pageNumber: number) {
      dispatch(fetchIndexAndDispatchSetIndexAsync({ fetchMethod, pageNumber }));
    },
    dispatchActions(key: any) {
      [setIsHiddenIndexListForTrue(), setRoutingKey(key)].forEach((action) => dispatch(action));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndexContainer);
