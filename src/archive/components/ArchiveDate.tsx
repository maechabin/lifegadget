import React from 'react';

import { formatDate } from '../../utils';
import { Article } from '../archiveState';

type PropsType = {
  article: Article;
}

function ArchiveDate({ article }: PropsType): JSX.Element {
  return (
    <p className="article__date">
      <i className="fa fa-calendar" /> <time>{formatDate(article.date)}</time>
    </p>
  );
}

export default ArchiveDate;
