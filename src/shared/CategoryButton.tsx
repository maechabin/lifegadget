import React from 'react';
import { Link } from 'react-router-dom';

function CategoryButton(): JSX.Element {
  return (
    <ul className="widget__category-button">
      <li>
        <Link to="/">新着</Link>
      </li>
      <li>
        <Link to="/category/18">
          ライフ<span>ハック</span>
        </Link>
      </li>
      <li>
        <Link to="/category/14">
          本日の<span>アイテム</span>
        </Link>
      </li>
      <li>
        <Link to="/category/2">お知らせ</Link>
      </li>
    </ul>
  );
}

export default CategoryButton;
