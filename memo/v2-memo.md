## Typscript で JSON を読み込む

`typings.d.ts` を `src` 内に作成して以下を記述

```ts
declare module '*.json' {
  const value: any;
  export default value;
}
```

以下のように JSON ファイルを import できるようになる

```ts
import manifest from '../../build/asset-manifest.json';
```

## create-react-app でビルドして分割されたファイルを読み込む方法

Universal App を作成する場合、ビルドした js ファイルを SSR  した HTML で読み込む必要があるが、create-react-app でビルドすると、ファイルが分割され、なおかつファイル名にハッシュがつく。手動で書き換えるのは辛い。。

なお、ビルドした際に出力される `asset-manifest.json` にビルドされたファイル名とパスが記述されているので、これを ssr 時に読み込んで、動的にファイル名とパスを書き換えるようにする。

`asset-manifest.json` を読み込む

```ts
import manifest from '../../build/asset-manifest.json';
```

読み込んだ `asset-manifest.json` から .js ファイルを含むファイルのパスを抽出して、JSX に落とし込む（以下のように関数にしておくと良い）。

````ts
function getScriptFiles() {
  const filePath = Object.values(manifest.files).filter((file: string) => {
    return file.match(/\.js$/);
  });
  return filePath.map((path) => <script src={`/assets${path}`} />);
}

JSX内に挿入。

```jsx
<body>
  <div className="content" id="content">
    {children}
  </div>
  <script id="initial-data" type="text/plain" data-json={JSON.stringify(finalState)} />
  {getScriptFiles()}
</body>
````

ちなみに、クライアント用のルートコンポーネントで初期データを使用する場合は、以下のような感じで、データを取得する。

```ts
let initialData = null;

if (document.querySelector('#initial-data') !== null) {
  const data = document.querySelector('#initial-data');
  const json = data && data.getAttribute('data-json');
  if (json) {
    initialData = JSON.parse(json);
  }
}

const { store, history } = createRedux(initialData);
```

## WordPress REST API を使用する時に気をつけておきたいこと

WordPress の管理画面の設定 > パーマリンク設定で `基本` が設定されていると WP REST API が 404 を返すので、 `基本` 以外のもの（例えば、`数字ベース`）に設定する

CORS のエラーが出る場合は、`.htaccess` に以下を追加

```
<IfModule mod_headers.c>
Header set Access-Control-Allow-Origin "*"
Header append Access-Control-Allow-Headers "Content-Type"
</IfModule>
```

CORD エラーが出る場合は、アプリ側の `fetch()` のオプションを以下のようにする

```ts
fetch(url, {
  method: 'get',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});
```
