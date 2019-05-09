import React from 'react';
import { Link } from 'react-router-dom';

import { getCategoryFactory } from '../../domains/wordpress';

function ArchiveCategory(props: any): JSX.Element {
  const getCategory = getCategoryFactory(props.category);

  let categoryElem = <></>;

  if (props.article && props.article.categories.length > 0) {
    categoryElem = props.article.categories.map((id: number) => {
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
