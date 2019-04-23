import React from 'react';

function ArchiveTitle(props: any): JSX.Element {
  return <h2>{props.article.title.rendered}</h2>;
}

export default ArchiveTitle;
