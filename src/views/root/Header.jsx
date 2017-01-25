import React from 'react';
import { Link } from 'react-router';

import SearchForm from './SearchForm.jsx';

const Header = (props) => {
  const headerClassName = (props.location.pathname === '/') ? 'header' : 'header header__mini';
  return (
    <header className={headerClassName}>
      <div className="header__title">
        <h1>
          <Link to="/">
            <img src={props.config.blogLogoImage} alt={props.config.blogTitle} width="404" />
          </Link>
          <span>生活をサポートする記事メディア「ライフガジェット」</span>
        </h1>
        <SearchForm {...props} />
      </div>
    </header>
  );
};

export default Header;
