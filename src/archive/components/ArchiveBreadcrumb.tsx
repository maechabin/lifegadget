import React from 'react';
import { Link } from 'react-router-dom';

import { Category, getCategoryFactory } from '../../domains/wordpress';

type PropsType = {
  /** ブログで使用中のカテゴリ情報一覧 */
  categories: Category[];
  /** 記事のカテゴリID一覧 */
  categoryIds: number[];
};

function ArchiveBreadcrumb({ categories, categoryIds }: PropsType): JSX.Element {
  const getCategory = getCategoryFactory(categories);
  const usedCategories = categoryIds.map((id: number) => getCategory(id));

  const category = usedCategories[0];
  const breadcrumbComponent = category ? (
    <>
      <li>
        <span>
          <i className="fa fa-chevron-right" />
        </span>
      </li>
      <li>
        <Link to={`/category/${category.id}`}>
          <i className="fa fa-folder" /> <span>{category.name}</span>
        </Link>
      </li>
    </>
  ) : (
    undefined
  );

  return (
    <ul className="breadcrumb">
      <li>
        <Link to="/">
          <i className="fa fa-home" /> <span>ホーム</span>
        </Link>
      </li>
      {breadcrumbComponent}
    </ul>
  );
}

export default ArchiveBreadcrumb;
