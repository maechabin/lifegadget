import React from 'react';
import { Link } from 'react-router-dom';

import { Category } from '../../root/rootState';

function ArchiveBreadcrumb(props: any): JSX.Element {
  function getCategoryFactory(categories: Category[]) {
    return (categoryId: number): Category | undefined =>
      categories.find((category: Category) => category.id === categoryId);
  }

  const getCategory = getCategoryFactory(props.category);
  let categories = [];

  if (props.article && props.article.categories.length > 0) {
    categories = props.article.categories.map((id: number) => {
      return getCategory(id);
    });
  }

  const categoryId = categories[0] ? categories[0].id : '';
  const categoryName = categories[0] ? categories[0].name : '';

  return (
    <ul className="breadcrumb">
      <li>
        <Link to="/">
          <i className="fa fa-home" /> <span>ホーム</span>
        </Link>
      </li>
      <li>
        <span>
          <i className="fa fa-chevron-right" />
        </span>
      </li>
      <li>
        <Link to={`/category/${categoryId}`}>
          <i className="fa fa-folder" /> <span>{categoryName}</span>
        </Link>
      </li>
    </ul>
  );
}

export default ArchiveBreadcrumb;
