import React from 'react';

import ArchiveContent from './ArchiveContent';
import ArchiveBreadcrumb from './ArchiveBreadcrumb';
import ArchiveCategory from './ArchiveCategory';
import ArchiveDate from './ArchiveDate';
import ArchiveTag from './ArchiveTag';
import ArchiveTitle from './ArchiveTitle';
import ArchiveUser from './ArchiveUser';
import config from '../../config';
import CategoryButton from '../../widgets/CategoryButton';
import Adsense from '../../widgets/Adsense';
import NotFound from '../root/NotFound';

function Archive(props: any): JSX.Element {
  let article = <></>;

  if (props.article && !!props.article.id) {
    article =
      props.badRequest === true ? (
        <NotFound {...props} />
      ) : props.article.id !== Number(props.match.params.id) ? (
        <div className="article__loading">
          <img src="../../images/loading.svg" alt="loading..." />
        </div>
      ) : (
        <article className="article">
          <ArchiveBreadcrumb {...props} />
          <ArchiveDate {...props} />
          <ArchiveTitle {...props} />
          <div className="article__meta">
            <ArchiveUser {...props} nameOnly />
            <ArchiveCategory {...props} />
            <ArchiveTag {...props} />
          </div>
          <Adsense
            style={{ marginTop: '32px' }}
            adsense={'LifeGadget_レスポンシブ'}
            client={config.adsenseCode}
            slot={'8575297173'}
            format={'auto'}
          />
          <ArchiveContent {...props} />
          <ArchiveCategory {...props} />
          <ArchiveTag {...props} />
          <ArchiveUser {...props} nameOnly={false} />
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
}

export default Archive;
