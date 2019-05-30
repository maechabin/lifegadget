import React from 'react';

import { State } from '../state.model';
import config from '../config';
import manifest from '../../build/asset-manifest.json';

type PropsTypes = {
  children: JSX.Element | JSX.Element[];
  finalState: State;
};

function Html({ finalState, children }: PropsTypes): JSX.Element {
  const archive = finalState.archive.article;
  const routing = finalState.router.location;

  function getScriptFiles() {
    const filePath = Object.values(manifest.files).filter((file: string) => {
      return file.match(/\.js$/);
    });
    return filePath.map((path) => <script src={`/assets${path}`} />);
  }

  function getTitle(pathname: string) {
    switch (pathname) {
      case 'archives':
        if (archive && archive[1].hasOwnProperty('title')) {
          return `${archive[1].title} - ${config.blogTitleTag}`;
        }
        return '404 Not Found';
      default:
        return `${config.blogTitleTag} - ${config.blogSubTitle}`;
    }
  }

  function getImage(pathname: string) {
    switch (pathname) {
      case 'archives':
        return `${archive && archive[1].eyecatch}`;
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
        <link rel="shortcut icon" type="image/x-icon" href="/assets/favicon.ico" />
        <link rel="stylesheet" href="/assets/style.css" />
        <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1" />
        <meta name="robots" content="noindex,nofollow" />
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
          href={`http://${config.blogDomain}/feed`}
        />
      </head>

      <body>
        <div className="content" id="content">
          {children}
        </div>
        <script id="initial-data" type="text/plain" data-json={JSON.stringify(finalState)} />
        {getScriptFiles()}
      </body>
    </html>
  );
}

export default Html;
