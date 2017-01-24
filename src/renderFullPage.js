import serialize from 'serialize-javascript';
import config from '../config';

export default function renderFullPage(html, finalState) {
  const archive = finalState.archive.article;
  const routing = finalState.routing.locationBeforeTransitions;

  function getTitle(pathname) {
    switch (pathname) {
      case 'archives':
        return `${archive.title.rendered} - ${config.blogTitleTag}`;
      default:
        return `${config.blogTitleTag} - ${config.blogSubTitle}`;
    }
  }

  const pathname = routing.pathname.split('/')[1];
  const title = getTitle(pathname);

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1">
        <link rel="stylesheet" href="/assets/style.css">
        <link rel="stylesheet" href="/assets/css/font-awesome.min.css">
      </head>

      <body>
        <div class="content">${html}</div>
        <script>
          console.log(${serialize(finalState)});
          window.__PRELOADED_STATE__ = ${serialize(finalState)}
        </script>
        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

          ga('create', '${config.analyticsCode}', 'auto');
        </script>
        <script src="/assets/bundle.js"></script>
      </body>
    </html>
    `;
}
