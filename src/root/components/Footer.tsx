import React from 'react';
import { Link } from 'react-router-dom';
// import Scrollchor from 'react-scrollchor';

function Footer(props: any): JSX.Element {
  return (
    <footer className="footer">
      <div className="footer__nav">
        {/* <Scrollchor to="#content"> */}
        <i className="fa fa-chevron-up" />
        <br />
        PAGE TOP
        {/* </Scrollchor> */}
      </div>
      <ul className="footer__social">
        <li>
          <Link to="https://www.facebook.com/lifegadgetme/" target="_blank">
            <i className="fa fa-facebook" />
          </Link>
        </li>
        <li>
          <Link to="https://twitter.com/lifegadgetme" target="_blank">
            <i className="fa fa-twitter" />
          </Link>
        </li>
        <li>
          <Link
            to="//cloud.feedly.com/#subscription/feed/http://lifegadget.me/feed"
            target="_blank">
            <i className="fa fa-feed" />
          </Link>
        </li>
      </ul>
      &copy; 2017
      <address>
        <Link to="/">
          <img src={props.config.blogLogoImage} alt={props.config.blogTitle} width="80" />
        </Link>
      </address>
    </footer>
  );
}

export default Footer;