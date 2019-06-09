import React from 'react';

import ArchiveContent from './ArchiveContent';
import ArchiveBreadcrumb from './ArchiveBreadcrumb';
import ArchiveCategory from './ArchiveCategory';
import ArchiveDate from './ArchiveDate';
import ArchiveTag from './ArchiveTag';
import ArchiveTitle from './ArchiveTitle';
import ArchiveUser from './ArchiveUser';
import CategoryButton from '../../shared/CategoryButton';
import Adsense from '../../shared/Adsense';
import { Article } from '../archiveState';
import { Category, User } from '../../domains/wordpress';

require('dotenv').config();

type PropsType = {
  /** 記事 */
  article: Article;
  /** 投稿しているユーザー情報一覧 */
  user: User[];
  /** ブログで使用中のカテゴリ情報一覧 */
  category: Category[];
};

function Archive({ article, user, category }: PropsType): JSX.Element {
  const articleComponent =
    article && !!article.id ? (
      <article className="article">
        <ArchiveBreadcrumb categories={category} categoryIds={article.categories} />
        <ArchiveDate date={article.date} />
        <ArchiveTitle title={article.title} />
        <div className="article__meta">
          <ArchiveUser users={user} authorId={article.author} shouldDisplayOnlyName />
          <ArchiveCategory categories={category} categoryIds={article.categories} />
          <ArchiveTag tags={article.tags} tagNames={article.tagNames} />
        </div>
        <Adsense
          style={{ marginTop: '32px' }}
          adsense={'LifeGadget_レスポンシブ'}
          client={process.env.REACT_APP_GOOGLE_ADSENSE_CODE}
          slot={'7443537956'}
          format={'auto'}
        />
        <ArchiveContent article={article} />
        <ArchiveCategory categories={category} categoryIds={article.categories} />
        <ArchiveTag tags={article.tags} tagNames={article.tagNames} />
        <ArchiveUser users={user} authorId={article.author} shouldDisplayOnlyName={false} />
      </article>
    ) : (
      <></>
    );

  return (
    <section>
      {articleComponent}
      <CategoryButton />
      <Adsense
        style={{ backgroundColor: '#F5F5F5' }}
        adsense={'LifeGadget_レスポンシブ'}
        client={process.env.REACT_APP_GOOGLE_ADSENSE_CODE}
        slot={'7443537956'}
        format={'auto'}
      />
    </section>
  );
}

export default Archive;
