import React from 'react';
import { Link } from 'react-router';

const CategoryButton = (props) => {
  return (
    <ul className="widget__category-button">
      <li><Link to="/">新着</Link></li>
      <li><Link to="/category/18">ライフ<span>ハック</span></Link></li>
      <li><Link to="/category/14">本日の<span>アイテム</span></Link></li>
      <li><Link to="/category/2">お知らせ</Link></li>
    </ul>
  );
};

export default CategoryButton;
