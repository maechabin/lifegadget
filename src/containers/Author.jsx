import React from 'react';
import { connect } from 'react-redux';
import fetch from 'node-fetch';
import { searchArticleAsync, resetList, saveRoutingKey } from '../actions/indexAction';
import config from '../../config';

// view files
import IndexComp from '../views/index/IndexComp.jsx';

class Author extends React.Component {
  static handleFetch(dispatch, renderProps) {
    return dispatch(
      searchArticleAsync(this.fetchData, renderProps.params.author, renderProps.params.page),
    );
  }

  static fetchData(author, page = 1) {
    const params = `?context=embed&author=${author}&per_page=${config.perPage}&page=${page}`;
    return fetch(`${config.blogUrl}/wp-json/wp/v2/posts${params}`, {
      method: 'get',
      mode: 'cors',
    }).then((res) => {
      if (res.status === 200) {
        return [res.json(), res.headers._headers];
      }
      return console.dir(res);
    });
  }

  componentDidMount() {
    return [
      this.props.handleInit(this.props.routingKey),
      this.props.handleFetch(
        this.props.params.author,
        Author.fetchData,
        this.props.params.page,
      ),
    ];
  }

  componentWillUpdate(nextProps) {
    if (nextProps.params.page !== '' && nextProps.params.page !== this.props.params.page) {
      return [
        this.props.handleFetch(
          this.props.params.author,
          Author.fetchData,
          nextProps.params.page),
      ];
    }
    return false;
  }

  componentDidUpdate() {
    const ads = document.querySelectorAll('.adsbygoogle');
    if (ads.length > 0) {
      try {
        (adsbygoogle = window.adsbygoogle || []).push({});
      } catch(error) {}
    }
  }

  render() {
    return (
      <IndexComp {...this.props} />
    );
  }
}
Author.propTypes = {
  routingKey: React.PropTypes.string,
  author: React.PropTypes.arrayOf(React.PropTypes.object),
  params: React.PropTypes.shape({
    author: React.PropTypes.string,
    page: React.PropTypes.string,
  }),
  handleInit: React.PropTypes.func,
  handleFetch: React.PropTypes.func,
};

function mapStateToProps(state) {
  return {
    index: state.index.index,
    author: state.root.user,
    resetList: state.index.resetList,
    total: Number(state.index.total),
    totalPages: Number(state.index.totalPages),
    currentPage: state.index.currentPage,
    pathname: state.routing.locationBeforeTransitions.pathname,
    routingKey: state.routing.locationBeforeTransitions.key,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleFetch(author, callback, page) {
      return dispatch(searchArticleAsync(callback, author, page));
    },
    handleInit(key) {
      return [resetList(), saveRoutingKey(key)].map(
        action => dispatch(action),
      );
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Author);
