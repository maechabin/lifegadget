import React from 'react';

function NotFound(props: any): JSX.Element {
  const notfound =
    props.routingKey != null ? (
      <div className="notfound">
        <img src="../../images/loading.svg" alt="loading..." />
      </div>
    ) : (
      <div className="notfound">
        <h2>ページが見つかりません。</h2>
        <p className="notfound__message">
          404
          <br />
          Not Found!
        </p>
      </div>
    );
  return <main>{notfound}</main>;
}

export default NotFound;
