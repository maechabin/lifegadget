## pm2 で babel-node を起動させる方法

pm2_config.json

```
{
  "apps" : [{
    "name"        : "lifegadget",
    "script"      : "./src/server.js",
    "watch"       : "true",
    "exec_interpreter" : "./node_modules/.bin/babel-node",
    "exec_mode"        : "fork"
  }]
}
```

```
$ pm2 start pm2_config.json
$ pm2 restart pm2_cofig.json
```

- https://github.com/davezuko/react-redux-starter-kit/issues/680

## セキュリティ関連

helmet のインストール

```
$ npm install --save helmet
```
