import React from 'react';

import IndexTitle from './IndexTitle.jsx';
import IndexList from './IndexList.jsx';
import Pagination from './Pagination.jsx';
import CategoryButton from '../../widget/CategoryButton.jsx'

const IndexComp = props => (
  <main className="index">
    <CategoryButton />
    <IndexTitle {...props} />
    <IndexList {...props} />
    <Pagination {...props} />
    <CategoryButton />
  </main>
);

export default IndexComp;
