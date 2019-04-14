import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const ArticleBreadcrumb = (props: any): JSX.Element => {
  const getCategory = (categoryList: any) => (id: any) =>
    categoryList.map((category: any, i: number) => (category.id === parseInt(id, 10) ? i : null));
  const getCategoryId = getCategory(props.category);
  const category = _.isEmpty(props.article.categories)
    ? ''
    : props.article.categories.map((id: any) => getCategoryId(id).find((i: any) => i != null));

  return (
    <>
      {/*<ul is itemscope itemtype="http://schema.org/BreadcrumbList" class="breadcrumb">
      <li is itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
        <Link is itemscope itemtype="http://schema.org/Thing" itemprop="item" to="/">
          <i className="fa fa-home" />{' '}
          <span is itemprop="name">
            ホーム
          </span>
        </Link>
      </li>
      <li>
        <span>
          <i className="fa fa-chevron-right" />
        </span>
      </li>
      <li is itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
        <Link
          is
          itemscope
          itemtype="http://schema.org/Thing"
          itemprop="item"
          to={`/category/${props.category[category[0]].id}`}>
          <i className="fa fa-folder" />{' '}
          <span is itemprop="name">
            {props.category[category[0]].name}
          </span>
        </Link>
      </li>
  </ul>*/}
    </>
  );
};

export default ArticleBreadcrumb;
