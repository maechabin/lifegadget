import React from 'react';

import { createRawMarkup } from '../../utils';
import { Article} from '../archiveState';

type PropsTypes = {
  article: Article;
}

function ArchiveContent({ article }: PropsTypes): JSX.Element {
  const archiveComponentChache = new WeakMap();

  let component = null;
  const cached = archiveComponentChache.get(article);
  if (cached) {
    component = cached;
  } else {
    component = (
      <div
        className="article__content"
        dangerouslySetInnerHTML={createRawMarkup(article.content.rendered.toString())}
      />
    );
    archiveComponentChache.set(article, component);
  }

  return component;
}

export default ArchiveContent;
