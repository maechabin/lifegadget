import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const ArticleCategory = (props: any) => {
  const getCategory = (categoryList: any) => (id: any) =>
    categoryList.map((category: any, i: number) => (category.id === id ? i : null));
  const getCategoryId = getCategory(props.category);
  const category = _.isEmpty(props.article.categories)
    ? ''
    : props.article.categories.map((id: any) => {
        const categoryId = getCategoryId(id).find((i: any) => i != null);
        return (
          <span key={id}>
            {/*<Link to={`/category/${props.category[categoryId].id}`}>
              {props.category[categoryId].name}
        </Link>*/}
          </span>
        );
      });

  return (
    <div className="article__category">
      <i className="fa fa-folder" /> {category}
    </div>
  );
};

export default ArticleCategory;
