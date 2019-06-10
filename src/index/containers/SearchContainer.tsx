import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State } from '../../state.model';
import { setIsLoading } from '../../root/rootAction';
import { fetchIndexAndDispatchSetIndexAsync, setIsHiddenIndexListForTrue } from '../indexAction';
import { fetchKeywordIndex } from '../../domains/wordpress';
import ScrollToTop from '../../shared/ScrollToTop';

// view files
import Loading from '../../shared/Loading';
import NotFound from '../../shared/NotFound';
import Index from '../components/Index';

function SearchContainer(props: any): JSX.Element {
  React.useEffect(() => {
    const isLoading = !(!props.isHiddenIndexList || props.hasError);
    props.dispatchSetIsLoading(isLoading);
  });

  React.useEffect(() => {
    props.dispatchSetIsHiddenIndexListForTrue();
    props.dispatchSetIndexAsync(
      fetchKeywordIndex,
      props.match.params.page,
      props.match.params.keyword,
    );
  }, [props.match.params.keyword, props.match.params.page]);

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
    index: state.index.index,
    hasError: state.index.hasError,
    keyword: state.root.searchValue,
    isHiddenIndexList: state.index.isHiddenIndexList,
    total: Number(state.index.total),
    totalPages: Number(state.index.totalPages),
    currentPage: state.index.currentPage,
    isLoading: state.root.isLoading,
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
)(SearchContainer);
