import React from 'react';

import { createRawMarkup } from '../../utils';
import { Article } from '../archiveState';

type PropsTypes = {
  article: Article;
};

let archiveComponentChache = new WeakMap();
let key: { id: number } = { id: NaN };

function ArchiveContent({ article }: PropsTypes): JSX.Element {
  console.log(article.id);

  if (key.id !== article.id) {
    archiveComponentChache = new WeakMap();
    key = { id: article.id };
  }

  let component = null;
  const cached = archiveComponentChache.get(key);
  console.log(archiveComponentChache);
  if (cached) {
    console.log('cached');
    component = cached;
  } else {
    console.log('no cached');
    component = (
      <div
        className="article__content"
        dangerouslySetInnerHTML={createRawMarkup(article.content.rendered.toString())}
      />
    );
    archiveComponentChache.set(key, component);
  }
  console.log(archiveComponentChache);
  return component;
}

export default ArchiveContent;
