import React from 'react';

import IndexTitle from './IndexTitle';
import IndexList from './IndexList';
import Pagination from '../../shared/Pagination';
import config from '../../config';
import CategoryButton from '../../shared/CategoryButton';
import Adsense from '../../shared/Adsense';
import NotFound from '../../shared/NotFound';

require('dotenv').config();

function Index(props: any): JSX.Element {
  const index = props.hasError ? (
    <NotFound {...props} />
  ) : (
    <section>
      <Adsense
        style={{ backgroundColor: '#F5F5F5' }}
        adsense={'LifeGadget_レスポンシブ'}
        client={process.env.REACT_APP_GOOGLE_ADSENSE_CODE}
        slot={'7443537956'}
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
        client={process.env.REACT_APP_GOOGLE_ADSENSE_CODE}
        slot={'7443537956'}
        format={'auto'}
      />
    </section>
  );
  return <main className="index">{index}</main>;
}

export default Index;
