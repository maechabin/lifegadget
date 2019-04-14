import React from 'react';

import ArticleContent from './ArticleContent';
import ArticleBreadcrumb from './ArticleBreadcrumb';
import ArticleCategory from './ArticleCategory';
import ArticleDate from './ArticleDate';
import ArticleTag from './ArticleTag';
import ArticleTitle from './ArticleTitle';
import ArticleUser from './ArticleUser';
import config from '../../config';
import CategoryButton from '../../widgets/CategoryButton.jsx';
import Adsense from '../../widgets/Adsense.jsx';
import NotFound from '../root/NotFound';

const Article = (props: any) => {
  console.log(props);
  let article = <></>;

  if (props.article && !!props.article.id) {
    console.log('aaa');
    article =
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
  }

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
