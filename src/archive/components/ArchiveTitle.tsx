import React from 'react';

type PropsType = {
  title: string;
};

function ArchiveTitle({ title }: PropsType): JSX.Element {
  return <h2>{title}</h2>;
}

export default ArchiveTitle;
