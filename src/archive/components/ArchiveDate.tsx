import React from 'react';

import { formatDate } from '../../utils';
import { Article } from '../archiveState';

type PropsTypes = {
  article: Article;
}

function ArchiveDate({ article }: PropsTypes): JSX.Element {
  return (
    <p className="article__date">
      <i className="fa fa-calendar" /> <time>{formatDate(article.date)}</time>
    </p>
  );
}

export default ArchiveDate;
