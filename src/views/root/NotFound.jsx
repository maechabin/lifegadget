import React from 'react';

const NotFound = (props) => {
  const notfound = (props.routingKey !== undefined && props.routingKey !== null) ? (
    <div className="notfound">
      <img src="/assets/image/loading.svg" alt="loading..." />
    </div>
  ) : (
    <div className="notfound">
      <h2>ページが見つかりません。</h2>
      <p className="notfound__message">404<br />Not Found!</p>
    </div>
  );
  return (
    <main>{notfound}</main>
  );
};
NotFound.propTypes = {
  routingKey: React.PropTypes.string,
};

export default NotFound;
