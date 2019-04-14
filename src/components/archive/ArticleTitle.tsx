import React from 'react';

const ArticleTitle = (props: any) => {
  return <h2>{props.article.title.rendered}</h2>;
};

export default ArticleTitle;
