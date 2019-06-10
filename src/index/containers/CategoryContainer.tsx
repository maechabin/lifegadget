import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State } from '../../state.model';
import { setIsLoading } from '../../root/rootAction';
import { fetchIndexAndDispatchSetIndexAsync, setIsHiddenIndexListForTrue } from '../indexAction';
import { fetchCategoryIndex } from '../../domains/wordpress';
import ScrollToTop from '../../shared/ScrollToTop';

// view files
import Loading from '../../shared/Loading';
import NotFound from '../../shared/NotFound';
import Index from '../components/Index';

function CategoryContainer(props: any): JSX.Element {
  React.useEffect(() => {
    const isLoading = !(!props.isHiddenIndexList || props.hasError);
    props.dispatchSetIsLoading(isLoading);
  });

  useEffect(() => {
    props.dispatchSetIsHiddenIndexListForTrue();
    props.dispatchSetIndexAsync(
      fetchCategoryIndex,
      props.match.params.page,
      props.match.params.category,
    );
  }, [props.match.params.page, props.match.params.category]);

  return (
    <ScrollToTop>
      <Loading isLoading={props.isLoading} size={100}>
        <NotFound isNotFound={props.hasError || props.index.length === 0}>
          <Index {...props} />
        </NotFound>
      </Loading>
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
    isLoading: state.root.isLoading,
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
)(CategoryContainer);
