import React from 'react';
import { connect } from 'react-redux';

import { State } from '../state.model';
import { setIndexAsync, resetList, saveRoutingKey } from '../actions/indexAction';
import { fetchCategoryIndex } from '../domains/wordpress';

// view files
import Index from '../components/index/Index';

declare const window: any;

class CategoryContainer extends React.Component<any, never> {
  static handleFetch(dispatch: any, renderProps: any) {
    dispatch(
      setIndexAsync({
        fetch: fetchCategoryIndex,
        pageNumber: renderProps.params.page,
        keyword: renderProps.params.category,
      }),
    );
  }

  // static fetchData(category: number, page: number = 1) {
  //   const params = `?context=embed&categories=${category}&per_page=${config.perPage}&page=${page}`;
  //   return fetch(`${config.blogUrl}/wp-json/wp/v2/posts${params}`, {
  //     method: 'get',
  //   })
  //     .then(CategoryContainer.handleErrors)
  //     .then((res) => {
  //       if (res.status === 200) {
  //         return [res.json(), res.headers._headers];
  //       }
  //       return console.log(res);
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
    this.props.dispatchSetIndexAsync(
      fetchCategoryIndex,
      this.props.match.params.page,
      this.props.match.params.category,
    );
    this.callAdSense();
  }

  componentWillUpdate(nextProps: any) {
    if (
      nextProps.match.params.page !== '' &&
      nextProps.match.params.page !== this.props.match.params.page
    ) {
      this.props.dispatchSetIndexAsync(
        fetchCategoryIndex,
        nextProps.match.params.page,
        this.props.match.params.category,
      );
    }
    if (nextProps.pathname !== this.props.pathname) {
      this.props.dispatchSetIndexAsync(
        fetchCategoryIndex,
        nextProps.match.params.page,
        nextProps.match.params.category,
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
    category: state.root.category,
    resetList: state.index.resetList,
    total: Number(state.index.total),
    totalPages: Number(state.index.totalPages),
    currentPage: state.index.currentPage,
    // pathname: state.routing.locationBeforeTransitions.pathname,
    // routingKey: state.routing.locationBeforeTransitions.key,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    dispatchSetIndexAsync(
      fetch: typeof fetchCategoryIndex,
      pageNumber: number,
      categoryId: string,
    ) {
      dispatch(setIndexAsync({ fetch, pageNumber, keyword: categoryId }));
    },
    handleInit(key: any) {
      [resetList(), saveRoutingKey(key)].map((action) => dispatch(action));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryContainer);
