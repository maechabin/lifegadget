import React from 'react';
import { Link } from 'react-router';

const Footer = props => (
  <footer className="footer">
    &copy; 2017
    <address>
      <Link to="/">
        <img src={props.config.blogLogoImage} alt={props.config.blogTitle} width="80" />
      </Link>
    </address>
  </footer>
);

export default Footer;
