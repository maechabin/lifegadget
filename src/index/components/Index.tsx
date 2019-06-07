import React from 'react';

import IndexTitle from './IndexTitle';
import IndexList from './IndexList';
import Pagination from '../../shared/Pagination';
import CategoryButton from '../../shared/CategoryButton';
import Adsense from '../../shared/Adsense';

require('dotenv').config();

function Index(props: any): JSX.Element {
  return (
    <main className="index">
      {' '}
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
    </main>
  );
}

export default Index;
