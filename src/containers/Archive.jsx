import React from 'react';
import { connect } from 'react-redux';
import fetch from 'node-fetch';
import { fetchArticleAsync, getTagsAsync } from '../actions/archiveAction';
import config from '../config';

// view files
import Article from '../components/archive/Article.jsx';

class Archive extends React.PureComponent {
  static handleFetch(dispatch, renderProps) {
    return dispatch(fetchArticleAsync(Archive.fetchData, renderProps.params.id));
  }

  static fetchData(id) {
    return fetch(`${config.blogUrl}/wp-json/wp/v2/posts/${id}?context=view`, {
      method: 'get',
      mode: 'cors',
    })
      .then(Archive.handleErrors)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return console.log(res);
      })
      .catch(() => console.log('bad request'));
  }

  static handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  callAdSense() {
    const ads = document.querySelectorAll('.adsbygoogle');
    if (ads.length > 0) {
      try {
        ads.forEach(() => {
          return (window.adsbygoogle = window.adsbygoogle || []).push({});
        });
      } catch (error) {}
    }
  }

  componentDidMount() {
    return Promise.all([
      this.props.handleFetch(this.props.match.params.id, Archive.fetchData),
    ]).then(() => {
      if (
        this.props.gettedTag === false &&
        Object.prototype.toString.call(this.props.article.tags) === '[object Array]'
      ) {
        return [this.props.handleGet(this.props.article.tags), this.callAdSense()];
      }
      return false;
    });
  }

  componentDidUpdate() {
    window.twttr.widgets.load();
  }

  render() {
    return <Article {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    badRequest: state.archive.badRequest,
    category: state.root.category,
    user: state.root.user,
    article: state.archive.article,
    tags: state.archive.tags,
    gettedTag: state.archive.gettedTag,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleFetch(id, callback) {
      return dispatch(fetchArticleAsync(callback, id));
    },
    handleGet(array) {
      return dispatch(getTagsAsync(array));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Archive);
