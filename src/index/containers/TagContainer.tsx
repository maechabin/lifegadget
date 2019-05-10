import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State } from '../../state.model';
import {
  fetchIndexAndDispatchSetIndexAsync,
  setIsHiddenIndexListForTrue,
  setRoutingKey,
  fetchTagNameAndDispatchSetTanNameAsync,
} from '../indexAction';
import { fetchTagIndex } from '../../domains/wordpress';
import ScrollToTop from '../../shared/ScrollToTop';

// view files
import Index from '../components/Index';

function TagContainer(props: any): JSX.Element {
  React.useEffect(() => {
    props.dispatchActions(props.routingKey);
  }, []);

  React.useEffect(() => {
    props.dispatchFetchTagNameAndDispatchSetTanNameAsync(props.match.params.tag);
  }, [props.match.params.page, props.match.params.tag]);

  React.useEffect(() => {
    props.dispatchSetIndexAsync(fetchTagIndex, props.match.params.page, props.match.params.tag);
  }, [props.match.params.page, props.match.params.tag]);

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
    isHiddenIndexList: state.index.isHiddenIndexList,
    tagName: state.index.tagName,
    total: Number(state.index.total),
    totalPages: Number(state.index.totalPages),
    currentPage: state.index.currentPage,
    routingKey: state.router.location.key,
  };
}
function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    dispatchSetIndexAsync(fetchMethod: typeof fetchTagIndex, pageNumber: number, tagId: number) {
      dispatch(fetchIndexAndDispatchSetIndexAsync({ fetchMethod, pageNumber, keyword: tagId }));
    },
    dispatchFetchTagNameAndDispatchSetTanNameAsync(tag: any) {
      dispatch(fetchTagNameAndDispatchSetTanNameAsync(tag));
    },
    dispatchActions(key: any) {
      [setIsHiddenIndexListForTrue(), setRoutingKey(key)].forEach((action) => dispatch(action));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TagContainer);
