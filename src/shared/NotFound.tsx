import React from 'react';

type PropsType = {
  isNotFound: boolean;
  children: JSX.Element | JSX.Element[];
};

function NotFound({ isNotFound, children }: PropsType): JSX.Element {
  const notFoundComponent = isNotFound ? (
    <div className="notfound">
      <h2>ページが見つかりません。</h2>
      <p className="notfound__message">Not Found!</p>
    </div>
  ) : (
    children
  );

  return <div>{notFoundComponent}</div>;
}

export default NotFound;

// props.routingKey != null
