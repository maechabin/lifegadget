import React from 'react';

function ArchiveContent(props: any): JSX.Element {
import { createRawMarkup } from '../../utils';
  }

  return <div className="article__content" dangerouslySetInnerHTML={rawMarkup('content')} />;
}

export default ArchiveContent;
