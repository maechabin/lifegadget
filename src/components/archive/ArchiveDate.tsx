import React from 'react';

const ArchiveDate = (props: any) => {
  function formatDate(date: any) {
    const dividedDate = date.split('T')[0].split('-');
    return `${dividedDate[0]}年${dividedDate[1]}月${dividedDate[2]}日`;
  }

  return (
    <p className="article__date">
      <i className="fa fa-calendar" /> <time>{formatDate(props.article.date)}</time>
    </p>
  );
};

export default ArchiveDate;
