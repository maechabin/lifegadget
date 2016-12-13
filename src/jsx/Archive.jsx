import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Showdown from 'showdown';
import fetch from 'node-fetch';
import { fetchArticleAsync } from '../action.js';

class Archive extends React.Component {
  static handleFetch(dispatch, renderProps) {
    return dispatch(fetchArticleAsync(this.fetchData, renderProps.params.id));
  }

  static fetchData(id) {
    return fetch(`http://localhost:8080/wordpress/wp-json/wp/v2/posts/${id}`, {
      method: "get",
      mode: 'cors',
    }).then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        return console.dir(response);
      }
    });
  }

  rawMarkup(contentType) {
    const converter = new Showdown.Converter();
    const rawMarkup = converter.makeHtml(this.props.data[contentType].rendered.toString());
    return { __html: rawMarkup };
  };

  componentWillMount() {
    console.log(this.props.dispatch);
    //Archive.handleFetch(this.props.params.id, this.props.dispatch);
  }

  render() {
    return (
      <div>
        <h1>
          <Link to="/">Lifegadget</Link>
        </h1>
        <article>
          <h2>{this.props.data.title.rendered}</h2>
          <p>
            <date>{this.props.data.date}</date>
          </p>
          <div dangerouslySetInnerHTML={this.rawMarkup('content')} />
        </article>
      </div>
    );
  };
}

// Connect to Redux
function mapStateToProps(state) {
  return {
    data: state.data,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleFetch(callback, id, dispatch) {
      dispatch(fetchArticleAsync(callback, id));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Archive);