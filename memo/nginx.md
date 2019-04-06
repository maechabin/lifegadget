## リバースプロキシの設定

1. wordpress_http.conf を編集

```
server {
        listen 80;
        server_name wp.lifegadget.me ;

}

#以下を追加
server {
  listen 80;
  server_name test.lifegadget.me;
  location / {
    proxy_pass http://localhost:3000;
    proxy_redirect off;
    proxy_set_header Host $host;
  }
}
```

2. NginX を再起動

```
$ kusanagi nginx
```
