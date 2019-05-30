import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State } from '../state.model';
import { setIsLoading } from '../root/rootAction';
import { fetchArticleAndDispatchSetAsync } from './archiveAction';
import { fetchArchive } from '../domains/wordpress';
import ScrollToTop from '../shared/ScrollToTop';

// view files
import Loading from '../shared/Loading';
import Archive from './components/Archive';

function ArchiveContainer(props: any): JSX.Element {
  React.useEffect(() => {
    // if (!(props.article && props.article[props.match.params.id])) {
    props.dispatchSetIsLoading(true);
    props.dispatchSetArticle(fetchArchive, props.match.params.id);
    props.dispatchSetIsLoading(false);
    // }
  }, []);

  React.useEffect(() => {
    // window.twttr.widgets.load();
  });

  return (
    <ScrollToTop>
      <Loading isLoading={props.isLoading}>
        <Archive {...props} article={props.article ? props.article[props.match.params.id] : null} />
      </Loading>
    </ScrollToTop>
  );
}

function mapStateToProps(state: State) {
  const currentId = state.archive.currentId;
  return {
    hasError: state.archive.hasError,
    category: state.root.category,
    user: state.root.user,
    article: state.archive.article,
    isLoading: state.root.isLoading,
  };
}
function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    dispatchSetArticle(fetchMethod: typeof fetchArchive, archiveId: number): void {
      dispatch(fetchArticleAndDispatchSetAsync({ fetchMethod, archiveId }));
    },
    dispatchSetIsLoading(isLoading: boolean) {
      dispatch(setIsLoading(isLoading));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArchiveContainer);
