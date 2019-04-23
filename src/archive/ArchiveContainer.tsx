import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State } from '../state.model';
import { fetchArticleAndDispatchSetAsync, fetchTagsAndDispatchSetTagsAsync } from './archiveAction';
import { fetchArchive } from '../domains/wordpress';

// view files
import Archive from './components/Archive';

function ArchiveContainer(props: any): JSX.Element {
  React.useEffect(() => {
    Promise.all([props.dispatchSetArticle(fetchArchive, props.match.params.id)]).then(() => {
      if (
        props.gettedTag === false &&
        Object.prototype.toString.call(props.article.tags) === '[object Array]'
      ) {
        props.disaptchSetTagsAsync(props.article.tags);
      }
    });
  }, []);

  React.useEffect(() => {
    // window.twttr.widgets.load();
  });

  return <Archive {...props} />;
}

function mapStateToProps(state: State) {
  return {
    badRequest: state.archive.badRequest,
    category: state.root.category,
    user: state.root.user,
    article: state.archive.article,
    tags: state.archive.tags,
    gettedTag: state.archive.gettedTag,
  };
}
function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    dispatchSetArticle(fetchMethod: typeof fetchArchive, archiveId: number): void {
      dispatch(fetchArticleAndDispatchSetAsync({ fetchMethod, archiveId }));
    },
    disaptchSetTagsAsync(array: any): void {
      dispatch(fetchTagsAndDispatchSetTagsAsync(array));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArchiveContainer);
