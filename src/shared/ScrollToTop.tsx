import React from 'react';
import { withRouter } from 'react-router-dom';

function ScrollToTop(props: any): JSX.Element {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [props.location.pathname]);
  return props.children;
}

export default withRouter(ScrollToTop);
