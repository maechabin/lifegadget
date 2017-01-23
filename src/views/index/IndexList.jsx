import React from 'react';
import { Link } from 'react-router';
import Showdown from 'showdown';

const IndexList = (props) => {
  function rawMarkup(content) {
    const converter = new Showdown.Converter();
    const markup = converter.makeHtml(content.toString());
    return { __html: markup };
  }
  function formatDate(date) {
    const dividedDate = date.split('T')[0].split('-');
    return `${dividedDate[0]}年${dividedDate[1]}月${dividedDate[2]}日`;
  }

  const list = (props.resetList && props.routingKey !== '') ? (
    <div className="list__loading">
      <img src="/assets/image/loading.svg" alt="loading..." />
    </div>
  ) : props.index.map(
    (item) => {
      const eyecatch = (item.source_url) ? <img src={item.source_url} alt={item.title.rendered} /> : '';
      return (
        <li key={item.id}>
          <Link to={`/archives/${item.id}`}>{eyecatch}</Link>
          <h3>
            <Link to={`/archives/${item.id}`}>{item.title.rendered}</Link>
          </h3>
          <p><time>{formatDate(item.date)}</time></p>
          <div dangerouslySetInnerHTML={rawMarkup(item.excerpt.rendered)} />
        </li>
      );
    },
  );
  return (
    <ul className="index__list">{list}</ul>
  );
};
IndexList.propTypes = {
  resetList: React.PropTypes.bool,
  routingKey: React.PropTypes.string,
  index: React.PropTypes.arrayOf(React.PropTypes.object),
};

export default IndexList;
