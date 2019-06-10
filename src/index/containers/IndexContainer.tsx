import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State } from '../../state.model';
import { fetchIndex } from '../../domains/wordpress';
import { setIsLoading } from '../../root/rootAction';
import { fetchIndexAndDispatchSetIndexAsync, setIsHiddenIndexListForTrue } from '../indexAction';
import ScrollToTop from '../../shared/ScrollToTop';

// view files
import Loading from '../../shared/Loading';
import NotFound from '../../shared/NotFound';
import Index from '../components/Index';

function IndexContainer(props: any): JSX.Element {
  React.useEffect(() => {
    const isLoading = !(!props.isHiddenIndexList || props.hasError);
    props.dispatchSetIsLoading(isLoading);
  });

  React.useEffect(() => {
    props.dispatchSetIsHiddenIndexListForTrue();
    props.dispatchSetIndexAsync(fetchIndex, props.match.params.page);
  }, [props.match.params.page]);

  return (
    <ScrollToTop>
      <Loading isLoading={props.isLoading} size={100}>
        <NotFound isNotFound={props.hasError}>
          <Index {...props} />
        </NotFound>
      </Loading>
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
    isLoading: state.root.isLoading,
  };
}
function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    dispatchSetIndexAsync(fetchMethod: typeof fetchIndex, pageNumber: number) {
      dispatch(fetchIndexAndDispatchSetIndexAsync({ fetchMethod, pageNumber }));
    },
    dispatchSetIsLoading(isLoading: boolean) {
      dispatch(setIsLoading(isLoading));
    },
    dispatchSetIsHiddenIndexListForTrue() {
      dispatch(setIsHiddenIndexListForTrue());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndexContainer);
