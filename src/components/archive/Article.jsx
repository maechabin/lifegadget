import React from 'react';

import ArticleContent from './ArticleContent.jsx.js';
import ArticleBreadcrumb from './ArticleBreadcrumb.jsx.js';
import ArticleCategory from './ArticleCategory.jsx.js';
import ArticleDate from './ArticleDate.jsx.js';
import ArticleTag from './ArticleTag.jsx.js';
import ArticleTitle from './ArticleTitle.jsx.js';
import ArticleUser from './ArticleUser.jsx.js';
import config from '../../config';
import CategoryButton from '../../widgets/CategoryButton.jsx';
import Adsense from '../../widgets/Adsense.jsx';
import NotFound from '../root/NotFound';

const Article = (props) => {
  const article =
    props.badRequest === true ? (
      <NotFound {...props} />
    ) : props.article.id !== Number(props.match.params.id) ? (
      <div className="article__loading">
        <img src="/assets/image/loading.svg" alt="loading..." />
      </div>
    ) : (
      <article className="article">
        <ArticleBreadcrumb {...props} />
        <ArticleDate {...props} />
        <ArticleTitle {...props} />
        <div className="article__meta">
          <ArticleUser {...props} nameOnly />
          <ArticleCategory {...props} />
          <ArticleTag {...props} />
        </div>
        <Adsense
          style={{ marginTop: '32px' }}
          adsense={'LifeGadget_レスポンシブ'}
          client={config.adsenseCode}
          slot={'8575297173'}
          format={'auto'}
        />
        <ArticleContent {...props} />
        <ArticleCategory {...props} />
        <ArticleTag {...props} />
        <ArticleUser {...props} nameOnly={false} />
      </article>
    );

  return (
    <section>
      {article}
      <CategoryButton />
      <Adsense
        style={{ backgroundColor: '#F5F5F5' }}
        adsense={'LifeGadget_レスポンシブ'}
        client={config.adsenseCode}
        slot={'8575297173'}
        format={'auto'}
      />
    </section>
  );
};

export default Article;
