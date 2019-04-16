import React from 'react';

import IndexTitle from './IndexTitle';
import IndexList from './IndexList';
import Pagination from './Pagination';
import config from '../../config';
import CategoryButton from '../../widgets/CategoryButton';
import Adsense from '../../widgets/Adsense';
import NotFound from '../root/NotFound';

const IndexComp = (props: any) => {
  const index = props.badRequest ? (
    <NotFound {...props} />
  ) : (
    <section>
      <Adsense
        style={{ backgroundColor: '#F5F5F5' }}
        adsense={'LifeGadget_レスポンシブ'}
        client={config.adsenseCode}
        slot={'8575297173'}
        format={'auto'}
      />
      <CategoryButton />
      <IndexTitle {...props} />
      <IndexList {...props} />
      <Pagination {...props} />
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
  return <main className="index">{index}</main>;
};

export default IndexComp;
