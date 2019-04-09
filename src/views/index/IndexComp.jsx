import React from 'react';

import IndexTitle from './IndexTitle.jsx';
import IndexList from './IndexList.jsx';
import Pagination from './Pagination.jsx';
import config from '../../config';
import CategoryButton from '../../widgets/CategoryButton.jsx';
import Adsense from '../../widgets/Adsense.jsx';
import NotFound from '../root/NotFound.jsx';

const IndexComp = (props) => {
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
