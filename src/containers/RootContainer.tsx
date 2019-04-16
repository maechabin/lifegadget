import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { State } from '../state.model';
import { changeValue, setSearchValue } from '../actions/rootAction';
import { routingArray } from '../routes';

import Layout from '../components/root/Layout';

function RootContainer(): JSX.Element {
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
function mapStateToProps(state: State) {
  return {
    inputValue: state.root.inputValue,
  };
}
function mapDispatchToProps(dispatch: Dispatch) {
  return {
    handleChange(keyword: string) {
      dispatch(changeValue(keyword));
    },
    handleSend(keyword: string) {
      dispatch(setSearchValue(keyword));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootContainer);
