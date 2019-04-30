import React from 'react';
import { Link } from 'react-router-dom';

import { Category } from '../../root/rootState';

function ArchiveCategory(props: any): JSX.Element {
  function getCategoryFactory(categories: Category[]) {
    return (categoryId: number): Category | undefined =>
      categories.find((category: Category) => category.id === categoryId);
  }

  const getCategory = getCategoryFactory(props.category);

  let categoryElem = <></>;

  if (props.article && props.article.categories.length > 0) {
    props.article.categories.map((id: number) => {
      const category = getCategory(id);

      if (!category) {
        return;
      }
      return (
        <span key={id}>
          <Link to={`/category/${category.id}`}>{category.name}</Link>
        </span>
      );
    });
  }

  return (
    <div className="article__category">
      <i className="fa fa-folder" /> {categoryElem}
    </div>
  );
}

export default ArchiveCategory;
