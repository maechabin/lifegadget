import React from 'react';
import { Link } from 'react-router-dom';
import Showdown from 'showdown';

function IndexList(props: any): JSX.Element {
  console.log(props);
  function rawMarkup(content: any) {
    const converter = new Showdown.Converter();
    const markup = converter.makeHtml(content.toString());
    return { __html: markup };
  }
  function formatDate(date: any) {
    const dividedDate = date.split('T')[0].split('-');
    return `${dividedDate[0]}年${dividedDate[1]}月${dividedDate[2]}日`;
  }

  const list =
    // props.isHiddenIndexList && props.routingKey !== '' ? (
    //   <div className="list__loading">
    //     <img src="../../images/loading.svg" alt="loading..." />
    //   </div>
    // ) : (
    props.index.map((item: any) => {
      const eyecatch = item.source_url ? (
        <img src={item.source_url} alt={item.title.rendered} />
      ) : (
        ''
      );
      return (
        <li key={item.id}>
          <Link to={`/archives/${item.id}`}>{eyecatch}</Link>
          <p className="index__list_date">
            <i className="fa fa-calendar" /> <time>{formatDate(item.date)}</time>
          </p>
          <h3 className="index__list_title">
            <Link to={`/archives/${item.id}`}>{item.title.rendered}</Link>
          </h3>
          <div
            className="index__list_description"
            dangerouslySetInnerHTML={rawMarkup(item.excerpt.rendered)}
          />
        </li>
      );
    });
  // );
  return <ul className="index__list">{list}</ul>;
}

export default IndexList;
