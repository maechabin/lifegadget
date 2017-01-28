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

Footer.propTypes = {
  config: React.PropTypes.shape({
    blogLogoImage: React.PropTypes.string,
    blogTitle: React.PropTypes.string,
  }),
};

export default Footer;
