import React from 'react';

import IndexTitle from './IndexTitle.jsx';
import IndexList from './IndexList.jsx';
import Pagination from './Pagination.jsx';
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
      adsense={"LifeGadget_記事下_レスポンシブ"}
      client={"ca-pub-5496880555378290"}
      slot={"4887750292"}
      format={"auto"}
    />
  </main>
);

export default IndexComp;
