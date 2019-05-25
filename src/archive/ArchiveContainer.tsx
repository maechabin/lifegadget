import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State } from '../state.model';
import { fetchArticleAndDispatchSetAsync } from './archiveAction';
import { fetchArchive } from '../domains/wordpress';
import ScrollToTop from '../shared/ScrollToTop';

// view files
import Archive from './components/Archive';

function ArchiveContainer(props: any): JSX.Element {
  React.useEffect(() => {
    // if (!(props.article && props.article[props.match.params.id])) {
    props.dispatchSetArticle(fetchArchive, props.match.params.id);
    // }
  }, []);

  React.useEffect(() => {
    // window.twttr.widgets.load();
  });

  return (
    <ScrollToTop>
      <Archive {...props} article={props.article ? props.article[props.match.params.id] : null} />
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
    tags: state.archive.tags,
    hasTagNames: state.archive.hasTagNames,
  };
}
function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    dispatchSetArticle(fetchMethod: typeof fetchArchive, archiveId: number): void {
      dispatch(fetchArticleAndDispatchSetAsync({ fetchMethod, archiveId }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArchiveContainer);
