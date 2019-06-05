import React from 'react';

import ArchiveContent from './ArchiveContent';
import ArchiveBreadcrumb from './ArchiveBreadcrumb';
import ArchiveCategory from './ArchiveCategory';
import ArchiveDate from './ArchiveDate';
import ArchiveTag from './ArchiveTag';
import ArchiveTitle from './ArchiveTitle';
import ArchiveUser from './ArchiveUser';
import config from '../../config';
import CategoryButton from '../../shared/CategoryButton';
import Adsense from '../../shared/Adsense';
import NotFound from '../../shared/NotFound';

require('dotenv').config();

function Archive(props: any): JSX.Element {
  let article = <></>;

  if (props.article && !!props.article.id) {
    article = (
      // props.hasError === true ? (
      //   <NotFound {...props} />
      // ) : props.article.id !== Number(props.match.params.id) ? (
      //   <div className="article__loading">
      //     <img src="../../images/loading.svg" alt="loading..." />
      //   </div>
      // ) : (
      <article className="article">
        <ArchiveBreadcrumb {...props} />
        <ArchiveDate {...props} />
        <ArchiveTitle {...props} />
        <div className="article__meta">
          <ArchiveUser {...props} shouldDisplayOnlyName />
          <ArchiveCategory {...props} />
          <ArchiveTag {...props} />
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
        <ArchiveTag {...props} />
        <ArchiveUser {...props} shouldDisplayOnlyName={false} />
      </article>
    );
    // );
  }

  return (
    <section>
      {article}
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
