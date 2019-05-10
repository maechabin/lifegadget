import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State } from '../../state.model';
import { fetchIndex } from '../../domains/wordpress';
import {
  fetchIndexAndDispatchSetIndexAsync,
  setIsHiddenIndexListForTrue,
  setRoutingKey,
} from '../indexAction';
import ScrollToTop from '../../shared/ScrollToTop';

// view files
import Index from '../components/Index';

function IndexContainer(props: any): JSX.Element {
  React.useEffect(() => {
    props.dispatchActions(props.routingKey);
    props.dispatchSetIndexAsync(fetchIndex, props.match.params.page);
  }, [props.match.params.page]);

  return (
    <ScrollToTop>
      <Index {...props} />
    </ScrollToTop>
  );
}

// Connect to Redux
function mapStateToProps(state: State) {
  return {
    hasError: state.index.hasError,
    index: state.index.index,
    isHiddenIndexList: state.index.isHiddenIndexList,
    total: Number(state.index.total),
    totalPages: Number(state.index.totalPages),
    currentPage: state.index.currentPage,
    routingKey: state.router.location.key,
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
