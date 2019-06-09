import React from 'react';
import { Link } from 'react-router-dom';

import { Category, getCategoryFactory } from '../../domains/wordpress';

type PropsType = {
  /** ブログで使用中のカテゴリ情報一覧 */
  categories: Category[];
  /** 記事のカテゴリID一覧 */
  categoryIds: number[];
};

function ArchiveCategory({ categories, categoryIds }: PropsType): JSX.Element {
  const getCategory = getCategoryFactory(categories);

  let categoryComponent = undefined;

  if (categoryIds && categoryIds.length > 0) {
    categoryComponent = categoryIds.map((id: number) => {
      const category = getCategory(id);

      return category ? (
        <span key={id}>
          <Link to={`/category/${category.id}`}>{category.name}</Link>
        </span>
      ) : (
        undefined
      );
    });
  }

  return (
    <div className="article__category">
      <i className="fa fa-folder" /> {categoryComponent}
    </div>
  );
}

export default ArchiveCategory;
