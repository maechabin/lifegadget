import React from 'react';
import Showdown from 'showdown';

const ArticleContent = (props) => {
  function rawMarkup(contentType) {
    const converter = new Showdown.Converter();
    const markup = converter.makeHtml(props.article[contentType].rendered.toString());
    return { __html: markup };
  }

  return (
    <div className="article__content" dangerouslySetInnerHTML={rawMarkup('content')} />
  );
};
ArticleContent.propTypes = {
  article: React.PropTypes.shape({
    content: React.PropTypes.object,
  }),
};

export default ArticleContent;
