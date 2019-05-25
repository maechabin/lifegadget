import React from 'react';
import { Link } from 'react-router-dom';

import { createRawMarkup, formatDate } from '../../utils';
import { Index } from '../indexState';

type PropsTypes = {
  index: Index[];
};

function IndexList({ index }: PropsTypes): JSX.Element {
  const indexComponentCache = new WeakMap();

  const listComponent =
    // props.isHiddenIndexList && props.routingKey !== '' ? (
    //   <div className="list__loading">
    //     <img src="../../images/loading.svg" alt="loading..." />
    //   </div>
    // ) : (
    index.map((item: Index) => {
      let component = null;
      const cached = indexComponentCache.get(item);

      if (cached) {
        component = cached;
      } else {
        /** アイキャッチ画像 */
        const eyecatch = item.source_url ? (
          <img src={item.source_url} alt={item.title.rendered} />
        ) : (
          ''
        );
        component = (
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
              dangerouslySetInnerHTML={createRawMarkup(item.excerpt.rendered.toString())}
            />
          </li>
        );
        indexComponentCache.set(item, component);
      }

      return component;
    });
  // );
  return <ul className="index__list">{listComponent}</ul>;
}

export default IndexList;
