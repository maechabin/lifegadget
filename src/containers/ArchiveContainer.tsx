import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State } from '../state.model';
import {
  fetchArticleAndDispatchSetAsync,
  fetchTagsAndDispatchSetTagsAsync,
} from '../actions/archiveAction';
import { fetchArchive } from '../domains/wordpress';

// view files
import Archive from '../components/archive/Archive';

class ArchiveContainer extends React.PureComponent<any, never> {
  static handleFetch(dispatch: any, renderProps: any) {
    dispatch(
      fetchArticleAndDispatchSetAsync({
        fetchMethod: fetchArchive,
        archiveId: renderProps.params.id,
      }),
    );
  }

  // static fetchData(id: number) {
  //   return fetch(`${config.blogUrl}/wp-json/wp/v2/posts/${id}?context=view`, {
  //     method: 'get',
  //   })
  //     .then(ArchiveContainer.handleErrors)
  //     .then((res: any) => {
  //       if (res.status === 200) {
  //         return res.json();
  //       }
  //       return console.log(res);
  //     })
  //     .catch(() => console.log('bad request'));
  // }

  componentDidMount() {
    Promise.all([this.props.dispatchSetArticle(fetchArchive, this.props.match.params.id)]).then(
      () => {
        if (
          this.props.gettedTag === false &&
          Object.prototype.toString.call(this.props.article.tags) === '[object Array]'
        ) {
          this.props.disaptchSetTagsAsync(this.props.article.tags);
        }
      },
    );
  }

  componentDidUpdate() {
    // window.twttr.widgets.load();
  }

  render() {
    return <Archive {...this.props} />;
  }
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
