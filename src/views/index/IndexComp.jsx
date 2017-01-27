import React from 'react';

import IndexTitle from './IndexTitle.jsx';
import IndexList from './IndexList.jsx';
import Pagination from './Pagination.jsx';
import config from '../../../config';
import CategoryButton from '../../widgets/CategoryButton.jsx';
import Adsense from '../../widgets/Adsense.jsx';

const IndexComp = props => (
  <main className="index">
    <CategoryButton />
    <IndexTitle {...props} />
    <IndexList {...props} />
    <Pagination {...props} />
    <CategoryButton />
    <Adsense
      style={{ backgroundColor: '#F5F5F5' }}
      adsense={"LifeGadget_一覧下_レスポンシブ"}
      client={config.adsenseCode}
      slot={"9045421499"}
      format={"auto"}
    />
  </main>
);

export default IndexComp;
