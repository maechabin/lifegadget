import React from 'react';

import config from '../../config';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

function Layout(props: any): JSX.Element {
  return (
    <>
      {/*<Header {...props} config={config} />*/}
      {props.children}
      <Sidebar />
      {/*<Footer config={config} />*/}
    </>
  );
}

export default Layout;
