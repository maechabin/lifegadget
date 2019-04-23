import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { State } from '../state.model';
import {
  changeSearchKeyword,
  setSearchKeyword,
  fetchCategoryAndDispatchSetCategoryAsync,
  fetchUserAndDispatchSetUserAsync,
} from './rootAction';
import { routingArray } from '../routes';

import Layout from './components/Layout';

function RootContainer(props: any): JSX.Element {
  React.useEffect(() => {
    props.dispatchSetCategory();
    props.dispatchSetUser();
  }, []);

  const routes = routingArray.map((route) => {
    return (
      <Route exact={true} path={route.path} component={route.component} key={props.match.path} />
    );
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
function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    dispatchSetCategory() {
      dispatch(fetchCategoryAndDispatchSetCategoryAsync());
    },
    dispatchSetUser() {
      dispatch(fetchUserAndDispatchSetUserAsync());
    },
    dispatchChangeSearchKeyword(keyword: string) {
      dispatch(changeSearchKeyword(keyword));
    },
    dispatchSetSearchKeyword(keyword: string) {
      dispatch(setSearchKeyword(keyword));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootContainer);
