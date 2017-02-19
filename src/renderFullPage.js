import serialize from 'serialize-javascript';
import config from '../config';

export default function renderFullPage(html, finalState) {
  const archive = finalState.archive.article;
  const routing = finalState.routing.locationBeforeTransitions;

  function getTitle(pathname) {
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
  function getImage(pathname) {
    switch (pathname) {
      case 'archives':
        return `${finalState.archive.articleImage}`;
      default:
        return `${config.blogUrl}${config.blogDefaultImage}`;
    }
  }

  const pathname = routing.pathname.split('/')[1];
  const title = getTitle(pathname);
  const image = getImage(pathname);

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <link rel="shortcut icon" type="image/x-icon" href="/assets/image/favicon.ico">
        <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1">
        <link rel="stylesheet" href="/assets/style.css">
        <meta property="og:type" content="website">
        <meta property="og:title" content="${title}">
        <meta property="og:site_name" content="${config.blogTitle}">
        <meta property="og:image" content="${image}">
        <meta property="og:locale" content="ja_JP">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="${config.twitter}">
        <meta name="twitter:title" content="${title}">
        <meta name="twitter:description" content="${title}">
        <meta name="twitter:image:src" content="${image}">
        <meta name="twitter:domain" content="${config.blogDomain}">
        <meta name="twitter:creator" content="${config.twitter}">
        <link rel="alternate" type="application/rss+xml" title="RSS" href="http://${config.blogDomain}/feed">
      </head>

      <body>
        <div class="content" id="content">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${serialize(finalState)};
        </script>
        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

          ga('create', '${config.analyticsCode}', 'auto');
        </script>
        <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
        <script src="/assets/bundle.js"></script>
      </body>
    </html>
    `;
}
