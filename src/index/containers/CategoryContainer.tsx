import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State } from '../../state.model';
import {
  fetchIndexAndDispatchSetIndexAsync,
  setIsHiddenIndexListForTrue,
  setRoutingKey,
} from '../indexAction';
import { fetchCategoryIndex } from '../../domains/wordpress';
import ScrollToTop from '../../shared/ScrollToTop';

// view files
import Index from '../components/Index';

function CategoryContainer(props: any): JSX.Element {
  useEffect(() => {
    props.dispatchActions(props.routingKey);
    props.dispatchSetIndexAsync(
      fetchCategoryIndex,
      props.match.params.page,
      props.match.params.category,
    );
  }, [props.match.params.page, props.match.params.category]);

  return (
    <ScrollToTop>
      <Index {...props} />
    </ScrollToTop>
  );
}

function mapStateToProps(state: State) {
  return {
    index: state.index.index,
    hasError: state.index.hasError,
    category: state.root.category,
    isHiddenIndexList: state.index.isHiddenIndexList,
    total: Number(state.index.total),
    totalPages: Number(state.index.totalPages),
    currentPage: state.index.currentPage,
    pathname: state.router.location.pathname,
    routingKey: state.router.location.key,
  };
}
function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    dispatchSetIndexAsync(
      fetchMethod: typeof fetchCategoryIndex,
      pageNumber: number,
      categoryId: string,
    ) {
      dispatch(
        fetchIndexAndDispatchSetIndexAsync({ fetchMethod, pageNumber, keyword: categoryId }),
      );
    },
    dispatchActions(key: any) {
      [setIsHiddenIndexListForTrue(), setRoutingKey(key)].forEach((action) => dispatch(action));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryContainer);
