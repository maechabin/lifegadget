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

require('dotenv').config();

function Archive(props: any): JSX.Element {
  const articleComponent =
    props.article && !!props.article.id ? (
      <article className="article">
        <ArchiveBreadcrumb {...props} />
        <ArchiveDate date={props.article.date} />
        <ArchiveTitle title={props.article.title} />
        <div className="article__meta">
          <ArchiveUser {...props} shouldDisplayOnlyName />
          <ArchiveCategory {...props} />
          <ArchiveTag tags={props.article.tags} tagNames={props.article.tagNames} />
        </div>
        <Adsense
          style={{ marginTop: '32px' }}
          adsense={'LifeGadget_レスポンシブ'}
          client={process.env.REACT_APP_GOOGLE_ADSENSE_CODE}
          slot={'7443537956'}
          format={'auto'}
        />
        <ArchiveContent {...props} />
        <ArchiveCategory {...props} />
        <ArchiveTag tags={props.article.tags} tagNames={props.article.tagNames} />
        <ArchiveUser {...props} shouldDisplayOnlyName={false} />
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
