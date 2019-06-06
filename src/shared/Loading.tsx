import React from 'react';

type PropsType = {
  isLoading: boolean;
  size: number;
  children: JSX.Element | JSX.Element[];
};

function Loading({ isLoading, size, children }: PropsType): JSX.Element {
  const style = {
    loading: {
      padding: '80px 0',
      textAlign: 'center',
    } as React.CSSProperties,
  };

  const loadingComponent = isLoading ? (
    <div style={style.loading}>
      <img src={`${process.env.REACT_APP_IMAGE_PATH}/loading.svg`} alt="loading..." width={size} />
    </div>
  ) : (
    children
  );

  return <div>{loadingComponent}</div>;
}

export default Loading;
