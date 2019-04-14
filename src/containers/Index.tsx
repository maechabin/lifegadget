import React from 'react';
import { connect } from 'react-redux';
import fetch from 'node-fetch';

import { fetchIndexAsync, resetList, saveRoutingKey, saveMediaAsync } from '../actions/indexAction';
import config from '../config';

// view files
import IndexComp from '../views/index/IndexComp';

declare const window: any;

class Index extends React.PureComponent<any, any> {
  static handleFetch(dispatch: any, renderProps: any) {
    return dispatch(fetchIndexAsync(Index.fetchData, renderProps.path));
  }

  static fetchData(page = 1) {
    const params = `?context=embed&per_page=${config.perPage}&page=${page}`;
    return fetch(`${config.blogUrl}/wp-json/wp/v2/posts${params}`, {
      method: 'get',
    }).then((res: any) => {
      if (res.status === 200) {
        return [res.json(), res.headers._headers];
      }
      return console.log(res);
    });
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
      this.props.handleFetch(Index.fetchData, this.props.match.params.page),
      this.callAdSense(),
    ];
  }

  componentDidUpdate(nextProps: any) {
    if (
      nextProps.match.params.page !== '' &&
      nextProps.match.params.page !== this.props.match.params.page
    ) {
      return [
        this.props.handleInit(this.props.routingKey),
        this.props.handleFetch(Index.fetchData, nextProps.match.params.page),
      ];
    }
    return false;
  }

  render() {
    return <IndexComp {...this.props} />;
  }
}

// Connect to Redux
function mapStateToProps(state: any) {
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
function mapDispatchToProps(dispatch: any) {
  return {
    handleFetch(callback: any, page: any) {
      return dispatch(fetchIndexAsync(callback, page));
    },
    handleInit(key: any) {
      return [resetList(), saveRoutingKey(key)].map((action) => dispatch(action));
    },
    getEyeCatchImage(id: any) {
      return dispatch(saveMediaAsync(id));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index);
