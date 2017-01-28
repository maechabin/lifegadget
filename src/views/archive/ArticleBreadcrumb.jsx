import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

const ArticleBreadcrumb = (props) => {
  const getCategory = categoryList => id => categoryList.map(
    (category, i) => (category.id === parseInt(id, 10) ? i : null),
  );
  const getCategoryId = getCategory(props.category);
  const category = _.isEmpty(props.article.categories) ? '' : props.article.categories.map(
    id => getCategoryId(id).find(i => i != null),
  );

  return (
    <ul is itemscope itemtype="http://schema.org/BreadcrumbList" class="breadcrumb">
      <li is itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
        <Link is itemscope itemtype="http://schema.org/Thing" itemprop="item" to="/">
          <i className="fa fa-home" /> <span is itemprop="name">ホーム</span>
        </Link>
      </li>
      <li>
        <span><i className="fa fa-chevron-right" /></span>
      </li>
      <li is itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
        <Link is itemscope itemtype="http://schema.org/Thing" itemprop="item" to={`/category/${props.category[category[0]].id}`}>
          <i className="fa fa-folder" /> <span is itemprop="name">
            {props.category[category[0]].name}
          </span>
        </Link>
      </li>
    </ul>
  );
};
ArticleBreadcrumb.propTypes = {
  article: React.PropTypes.shape({
    categories: React.PropTypes.array,
  }),
  category: React.PropTypes.arrayOf(React.PropTypes.object),
};

export default ArticleBreadcrumb;
