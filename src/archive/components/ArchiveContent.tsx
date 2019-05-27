import React from 'react';

import { createRawMarkup } from '../../utils';
import { Article } from '../archiveState';

type PropsTypes = {
  article: Article;
};

function ArchiveContent({ article }: PropsTypes): JSX.Element {
  const [key] = React.useState({ id: article.id });
  const [archiveComponentChache] = React.useState(new WeakMap());

  let component = null;
  const cached = archiveComponentChache.get(key);

  if (cached) {
    component = cached;
  } else {
    component = (
      <div
        className="article__content"
        dangerouslySetInnerHTML={createRawMarkup(article.content)}
      />
    );
    archiveComponentChache.set(key, component);
  }
  return component;
}

export default ArchiveContent;
