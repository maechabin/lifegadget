import React from 'react';
import { Link } from 'react-router-dom';

import { Category, getCategoryFactory } from '../../domains/wordpress';

type PropsType = {
  categories: Category[];
  categoryIds: number[];
};

function ArchiveBreadcrumb({ categories, categoryIds }: PropsType): JSX.Element {
  const getCategory = getCategoryFactory(categories);
  const ctgs = categoryIds.map((id: number) => {
    return getCategory(id);
  });

  const c = ctgs[0];
  const categoryId = c ? c.id : '';
  const categoryName = c ? c.name : '';

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
