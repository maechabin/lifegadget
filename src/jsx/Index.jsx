import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Showdown from 'showdown';
import fetch from 'node-fetch';
import { fetchIndexAsync } from '../action.js';
import config from '../../config.js';
import _ from 'lodash';

class Index extends React.Component {
  static handleFetch(dispatch, renderProps) {
    return dispatch(fetchIndexAsync(this.fetchData));
  }

  static fetchData() {
    return fetch(`${config.blogUrl}/wp-json/wp/v2/posts`, {
      method: 'get',
      mode: 'cors',
    }).then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        return console.dir(response);
      }
    });
  }

  componentWillMount() {
    console.log(this.props);
    return this.props.handleFetch(Index.fetchData);
  }

  render() {
    const list = _.isEmpty(this.props.index) ? '' : this.props.index.map(
      item => (
        <div key={item.id}>
          <Link to={`/archive/${item.id}`}>{item.title.rendered}</Link>
          <p>{item.date}</p>
        </div>
      )
    );
    return (
      <div>
        <main>{list}</main>
      </div>
    );
  };
}

// Connect to Redux
function mapStateToProps(state) {
  console.log('state: ');
  console.dir(state.app.index);
  return {
    index: state.app.index,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleFetch(callback) {
      return dispatch(fetchIndexAsync(callback));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
