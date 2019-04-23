import React from 'react';
import config from '../config';

function Html(props: any): JSX.Element {
  const archive = props.finalState.archive.article;
  const routing = props.finalState.routing.locationBeforeTransitions;

  function getTitle(pathname: any) {
    switch (pathname) {
      case 'archives':
        if (archive.hasOwnProperty('title')) {
          return `${archive.title.rendered} - ${config.blogTitleTag}`;
        }
        return '404 Not Found';
      default:
        return `${config.blogTitleTag} - ${config.blogSubTitle}`;
    }
  }
  function getImage(pathname: any) {
    switch (pathname) {
      case 'archives':
        return `${props.finalState.archive.articleImage}`;
      default:
        return `${config.blogUrl}${config.blogDefaultImage}`;
    }
  }

  const pathname = routing.pathname.split('/')[1];
  const title = getTitle(pathname);
  const image = getImage(pathname);

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="shortcut icon" type="image/x-icon" href="/assets/image/favicon.ico" />
        <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1" />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="stylesheet" href="/assets/style.css" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content={config.blogTitle} />
        <meta property="og:image" content={image} />
        <meta property="og:locale" content="ja_JP" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={config.twitter} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={title} />
        <meta name="twitter:image:src" content={image} />
        <meta name="twitter:domain" content={config.blogDomain} />
        <meta name="twitter:creator" content={config.twitter} />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href={`http://${config.blogDomain}/feed`} />
      </head>

      <body>
        <div className="content" id="content">{props.children}</div>
      </body>
    </html>
  );
}

export default Html;
