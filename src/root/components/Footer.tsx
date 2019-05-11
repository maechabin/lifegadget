import React from 'react';
import { Link } from 'react-router-dom';

function Footer(props: any): JSX.Element {
  const logo = require(`../../images/${props.config.blogLogoImage}`);

  return (
    <footer className="footer">
      <div className="footer__nav">
        <a href="#content">
          <i className="fa fa-chevron-up" />
          <br />
          PAGE TOP
        </a>
      </div>
      <ul className="footer__social">
        <li>
          <a href="https://www.facebook.com/lifegadgetme/" target="_blank">
            <i className="fa fa-facebook" />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/lifegadgetme" target="_blank">
            <i className="fa fa-twitter" />
          </a>
        </li>
        <li>
          <a href="//cloud.feedly.com/#subscription/feed/http://lifegadget.me/feed" target="_blank">
            <i className="fa fa-feed" />
          </a>
        </li>
      </ul>
      &copy; 2019
      <address>
        <Link to="/">
          <img src={logo} alt={props.config.blogTitle} width="80" />
        </Link>
      </address>
    </footer>
  );
}

export default Footer;
