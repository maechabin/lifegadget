import React from 'react';

import ArticleContent from './ArticleContent.jsx';
import ArticleBreadcrumb from './ArticleBreadcrumb.jsx';
import ArticleCategory from './ArticleCategory.jsx';
import ArticleDate from './ArticleDate.jsx';
import ArticleTag from './ArticleTag.jsx';
import ArticleTitle from './ArticleTitle.jsx';
import ArticleUser from './ArticleUser.jsx';
import CategoryButton from '../../widgets/CategoryButton.jsx';

const Article = (props) => {
  const article = (props.article.id !== Number(props.params.id)) ? (
    <div className="article__loading">
      <img src="/assets/image/loading.svg" alt="loading..." />
    </div>
  ) : (
    <section>
      <ArticleBreadcrumb {...props} />
      <ArticleDate {...props} />
      <ArticleUser {...props} nameOnly />
      <ArticleTitle {...props} />
      <ArticleCategory {...props} />
      <ArticleTag {...props} />
      <ArticleContent {...props} />
      <ArticleCategory {...props} />
      <ArticleTag {...props} />
      <ArticleUser {...props} nameOnly={false} />
      <CategoryButton />
    </section>
  );

  return (
    <article className="article">
      {article}
    </article>
  );
};
Article.propTypes = {
  article: React.PropTypes.shape({
    id: React.PropTypes.number,
  }),
  params: React.PropTypes.shape({
    id: React.PropTypes.string,
  }),
};

export default Article;
