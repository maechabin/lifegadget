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
import NotFound from '../shared/NotFound';
import Archive from './components/Archive';

function ArchiveContainer(props: any): JSX.Element {
  React.useEffect(() => {
    const isLoading = !((props.article && props.article[props.match.params.id]) || props.hasError);
    props.dispatchSetIsLoading(isLoading);
  });

  React.useEffect(() => {
    props.dispatchSetArticle(fetchArchive, props.match.params.id);
  }, []);

  React.useEffect(() => {
    // window.twttr.widgets.load();
  });

  return (
    <ScrollToTop>
      <Loading isLoading={props.isLoading} size={100}>
        <NotFound isNotFound={props.hasError}>
          <Archive
            {...props}
            article={props.article ? props.article[props.match.params.id] : null}
          />
        </NotFound>
      </Loading>
    </ScrollToTop>
  );
}

function mapStateToProps(state: State) {
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
