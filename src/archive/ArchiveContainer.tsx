import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State } from '../state.model';
import { fetchArticleAndDispatchSetAsync } from './archiveAction';
import { fetchArchive } from '../domains/wordpress';

// view files
import Archive from './components/Archive';

function ArchiveContainer(props: any): JSX.Element {
  React.useEffect(() => {
    props.dispatchSetArticle(fetchArchive, props.match.params.id);
  }, []);

  React.useEffect(() => {
    // window.twttr.widgets.load();
  });

  return <Archive {...props} />;
}

function mapStateToProps(state: State) {
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
