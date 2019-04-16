import React from 'react';
import Showdown from 'showdown';

function ArchiveContent(props: any): JSX.Element {
  function rawMarkup(contentType: any) {
    const converter = new Showdown.Converter();
    const markup = converter.makeHtml(props.article[contentType].rendered.toString());
    return { __html: markup };
  }

  return <div className="article__content" dangerouslySetInnerHTML={rawMarkup('content')} />;
}

export default ArchiveContent;
