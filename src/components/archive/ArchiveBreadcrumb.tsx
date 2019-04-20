import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

function ArchiveBreadcrumb(props: any): JSX.Element {
  function getCategory(categoryList: any[]): (id: any) => (number | null)[] {
    return (id: any): (number | null)[] => {
      return categoryList.map((category: any, i: number) =>
        category.id === parseInt(id, 10) ? i : null,
      );
    };
  }

  const getCategoryId = getCategory(props.category);
  const category = _.isEmpty(props.article.categories)
    ? ''
    : props.article.categories.map((id: number) => getCategoryId(id).find((i: any) => i != null));

  const categoryId = props.category[category[0]] ? props.category[category[0]].id : '';
  const categoryName = props.category[category[0]] ? props.category[category[0]].name : '';

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
