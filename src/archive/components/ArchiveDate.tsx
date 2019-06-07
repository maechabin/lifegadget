import React from 'react';

import { formatDate } from '../../utils';

type PropsType = {
  date: string;
};

function ArchiveDate({ date }: PropsType): JSX.Element {
  return (
    <p className="article__date">
      <i className="fa fa-calendar" /> <time>{formatDate(date)}</time>
    </p>
  );
}

export default ArchiveDate;
