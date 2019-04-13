import React from 'react';
import { Link } from 'react-router-dom';

import SearchForm from './SearchForm.jsx';

const Header = (props) => {
  // const headerClassName = props.location.pathname === '/' ? 'header' : 'header header__mini';
  const headerClassName = 'header';
  return (
    <header className={headerClassName}>
      <div className="header__title">
        <h1>
          <Link to="/">
            <img src={props.config.blogLogoImage} alt={props.config.blogTitle} width="404" />
          </Link>
          <span>
            生活をサポートする記事メディア<strong>「ライフガジェット」</strong>
          </span>
        </h1>
        <SearchForm {...props} />
        <ul className="header__tag">
          <li>
            #
            <Link to="/tag/7">
              <b>格安SIM</b>
            </Link>
          </li>
          <li>
            #
            <Link to="/tag/31">
              <b>プログラミング</b>
            </Link>
          </li>
          <li>
            #
            <Link to="/tag/39">
              <b>食</b>
            </Link>
          </li>
          <li>
            #
            <Link to="/tag/24">
              <b>文房具</b>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
