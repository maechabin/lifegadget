import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State } from '../state.model';
import { setIndexAsync, resetList, saveRoutingKey } from '../actions/indexAction';

// view files
import Index from '../components/index/Index';

declare const window: any;

class IndexContainer extends React.PureComponent<any, never> {
  static handleFetch(dispatch: any, renderProps: any) {
    dispatch(setIndexAsync(renderProps.path));
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
    console.log(this.props.routingKey);
    this.props.handleInit(this.props.routingKey);
    this.props.dispatchSetIndexAsync(this.props.match.params.page);
    this.callAdSense();
  }

  componentDidUpdate(nextProps: any) {
    if (
      nextProps.match.params.page !== '' &&
      nextProps.match.params.page !== this.props.match.params.page
    ) {
      this.props.handleInit(this.props.routingKey);
      this.props.dispatchSetIndexAsync(nextProps.match.params.page);
    }
  }

  render() {
    return <Index {...this.props} />;
  }
}

// Connect to Redux
function mapStateToProps(state: State) {
  console.log(state);
  return {
    badRequest: state.index.badRequest,
    index: state.index.index,
    resetList: state.index.resetList,
    total: Number(state.index.total),
    totalPages: Number(state.index.totalPages),
    currentPage: state.index.currentPage,
    // routingKey: state.routing.locationBeforeTransitions.key,
  };
}
function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    dispatchSetIndexAsync(pageName: number) {
      dispatch(setIndexAsync(pageName));
    },
    handleInit(key: any) {
      [resetList(), saveRoutingKey(key)].map((action) => dispatch(action));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndexContainer);
