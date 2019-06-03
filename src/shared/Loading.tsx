import React from 'react';

type PropsType = {
  isLoading: boolean;
  children: JSX.Element | JSX.Element[];
};

function Loading({ isLoading, children }: PropsType): JSX.Element {
  const childComponent = isLoading ? (
    <img src="../images/loading.svg" alt="loading..." />
  ) : (
    children
  );

  return <div className="article__loading">{childComponent}</div>;
}

export default Loading;
