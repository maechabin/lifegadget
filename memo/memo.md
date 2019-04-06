## エラー対応

```
Warning: render(): Target node has markup rendered by React, but there are unrelated nodes as well.
This is most commonly caused by white-space inserted around server-rendered markup.
```

### server.js

```js
<div class="content">${html}</div>
```

以下のように修正する（改行をなくす）

```js
<div class="content">${html}</div>
```

## polyfill 系

```js
import 'whatwg-fetch'; // polyfill
fetch.Promise = require('bluebird');
import find from 'array.prototype.find';
const Promise = require('es6-promise').Promise;
```

## API

カテゴリ検索<br>

- http://localhost:8080/wordpress/wp-json/wp/v2/posts/?filter[category_name]=information

タグ検索<br>

- http://localhost:8080/wordpress/wp-json/wp/v2/posts/?filter[tag]=wordpress

検索<br>

- http://localhost:8080/wp-json/wp/v2/posts/?search=kindle

記事一覧<br>

- http://localhost:8080/wp-json/wp/v2/posts

メディア取得<br>

- http://localhost:8080/wordpress/wp-json/wp/v2/media/[id]

カテゴリ一覧<br>

- http://localhost:8080/wordpress/wp-json/wp/v2/categories

タグ一覧<br>

- http://localhost:8080/wordpress/wp-json/wp/v2/tags

ユーザー一覧<br>

- http://localhost:8080/wordpress/wp-json/wp/v2/users
