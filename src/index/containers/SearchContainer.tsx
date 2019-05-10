import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State } from '../../state.model';
import {
  fetchIndexAndDispatchSetIndexAsync,
  setIsHiddenIndexListForTrue,
  setRoutingKey,
} from '../indexAction';
import { fetchKeywordIndex } from '../../domains/wordpress';
import ScrollToTop from '../../shared/ScrollToTop';

// view files
import Index from '../components/Index';

function SearchContainer(props: any): JSX.Element {
  React.useEffect(() => {
    props.dispatchActions(props.routingKey);
    props.dispatchSetIndexAsync(
      fetchKeywordIndex,
      props.match.params.page,
      props.match.params.keyword,
    );
  }, [props.match.params.keyword, props.match.params.page]);

  return (
    <ScrollToTop>
      <Index {...props} />
    </ScrollToTop>
  );
}

// Connect to Redux
function mapStateToProps(state: State) {
  return {
    index: state.index.index,
    hasError: state.index.hasError,
    keyword: state.root.searchValue,
    isHiddenIndexList: state.index.isHiddenIndexList,
    total: Number(state.index.total),
    totalPages: Number(state.index.totalPages),
    currentPage: state.index.currentPage,
    routingKey: state.router.location.key,
  };
}
function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    dispatchSetIndexAsync(
      fetchMethod: typeof fetchKeywordIndex,
      pageNumber: number,
      keyword: string,
    ) {
      dispatch(fetchIndexAndDispatchSetIndexAsync({ fetchMethod, pageNumber, keyword }));
    },
    dispatchActions(key: any) {
      [setIsHiddenIndexListForTrue(), setRoutingKey(key)].forEach((action) => dispatch(action));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchContainer);
