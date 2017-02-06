import React from 'react';
import { Link } from 'react-router';
import Scrollchor from 'react-scrollchor';

const Footer = props => (
  <footer className="footer">
    <div className="footer__nav">
      <Scrollchor to="#content">
        <i className="fa fa-chevron-up" />
        <br />
        PAGE TOP
      </Scrollchor>
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
    </ul>
    &copy; 2017
    <address>
      <Link to="/">
        <img src={props.config.blogLogoImage} alt={props.config.blogTitle} width="80" />
      </Link>
      <span className="footer__company">
        , <Link to="https://www.fancs.com/" target="_blank">F@N COMMUNICATIONS</Link>
      </span>
    </address>
  </footer>
);

Footer.propTypes = {
  config: React.PropTypes.shape({
    blogLogoImage: React.PropTypes.string,
    blogTitle: React.PropTypes.string,
  }),
};

export default Footer;
