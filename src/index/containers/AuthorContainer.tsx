import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State } from '../../state.model';
import {
  fetchIndexAndDispatchSetIndexAsync,
  setIsHiddenIndexListForTrue,
  setRoutingKey,
} from '../indexAction';
import { fetchAuthorIndex } from '../../domains/wordpress';
import ScrollToTop from '../../shared/ScrollToTop';

// view files
import Index from '../components/Index';

function AuthorContainer(props: any): JSX.Element {
  React.useEffect(() => {
    props.dispatchActions(props.routingKey);
    props.dispatchSetIndexAsync(
      fetchAuthorIndex,
      props.match.params.page,
      props.match.params.author,
    );
  }, [props.match.params.page]);

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
    author: state.root.user,
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
      fetchMethod: typeof fetchAuthorIndex,
      pageNumber: number,
      authorId: number,
    ) {
      dispatch(fetchIndexAndDispatchSetIndexAsync({ fetchMethod, pageNumber, keyword: authorId }));
    },
    dispatchActions(key: any) {
      [setIsHiddenIndexListForTrue(), setRoutingKey(key)].forEach((action) => dispatch(action));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthorContainer);
