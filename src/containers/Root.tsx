import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { changeValue, setSearchValue } from '../actions/rootAction';
import { routingArray } from '../routes';

import Layout from '../components/root/Layout';

function Root(props: any) {
  const routes = routingArray.map((route) => {
    return <Route exact={true} path={route.path} component={route.component} key={route.path} />;
  });

  return (
    <Layout>
      <Switch>{routes}</Switch>
    </Layout>
  );
}

// Connect to Redux
function mapStateToProps(state: any) {
  return {
    inputValue: state.root.inputValue,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    handleChange(keyword: any) {
      dispatch(changeValue(keyword));
    },
    handleSend(keyword: any) {
      dispatch(setSearchValue(keyword));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Root);
