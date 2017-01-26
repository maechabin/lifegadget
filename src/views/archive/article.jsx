import React from 'react';

import ArticleContent from './ArticleContent.jsx';
import ArticleBreadcrumb from './ArticleBreadcrumb.jsx';
import ArticleCategory from './ArticleCategory.jsx';
import ArticleDate from './ArticleDate.jsx';
import ArticleTag from './ArticleTag.jsx';
import ArticleTitle from './ArticleTitle.jsx';
import ArticleUser from './ArticleUser.jsx';
import CategoryButton from '../../widgets/CategoryButton.jsx';
import Adsense from '../../widgets/Adsense.jsx';

const Article = (props) => {
  const article = (props.article.id !== Number(props.params.id)) ? (
    <div className="article__loading">
      <img src="/assets/image/loading.svg" alt="loading..." />
    </div>
  ) : (
    <section>
      <ArticleBreadcrumb {...props} />
      <ArticleDate {...props} />
      <ArticleTitle {...props} />
      <ArticleUser {...props} nameOnly />
      <ArticleCategory {...props} />
      <ArticleTag {...props} />
      <Adsense
        adsense={"LifeGadget_記事下_レスポンシブ"}
        client={"ca-pub-5496880555378290"}
        slot={"4887750292"}
        format={"auto"}
      />
      <ArticleContent {...props} />
      <ArticleCategory {...props} />
      <ArticleTag {...props} />
      <ArticleUser {...props} nameOnly={false} />
      <CategoryButton />
      <Adsense
        adsense={"LifeGadget_記事下_レスポンシブ"}
        client={"ca-pub-5496880555378290"}
        slot={"4887750292"}
        format={"auto"}
      />
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
