import React from 'react';

type PropsType = {
  isLoading: boolean;
  children: JSX.Element | JSX.Element[];
};

function Loading({ isLoading, children }: PropsType): JSX.Element {
  const style = {
    loading: {
      padding: '80px 0',
      textAlign: 'center',
    } as React.CSSProperties,
  };

  const childComponent = isLoading ? (
    <div style={style.loading}>
      <img
        src={`${process.env.REACT_APP_IMAGE_PATH}/loading.svg`}
        alt="loading..."
        width="100"
        height="100"
      />
    </div>
  ) : (
    children
  );

  return <div>{childComponent}</div>;
}

export default Loading;
