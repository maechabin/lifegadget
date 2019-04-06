## node.js のインストール

```bash
$ yum install nodejs npm --enablerepo=epel
$ npm install -g n
$ n stable
```

http://moro-archive.hatenablog.com/entry/2015/07/27/225747

## マルチドメインの設定

- http://akkagi.info/20151207_web/
- http://data-hacker.blogspot.jp/2014/03/nginxcentos.html（古い）

## kusanagi の設定

```bash
$ yum --enablerepo=remi,remi-php56 update -y
$ reboot
$ kusanagi -v
$ kusanagi init
$ kusanagi init --tz tokyo
$ yum install nodejs npm --enablerepo=epel
```

## kusanagi のプロビジョニング

```bash
$ kusanagi provision --WordPress [プロジェクト名]
```

## DB Name

```
name: lifegadget
user name: lg-root
password: 11111111
```

## ホスト名を指定

IP アドレスで指定する場合

```bash
# /home/kusanagi/wordpressに160.16.57.166でアクセス
$ kusanagi setting --fqdn 160.16.57.166 wordpress
```

ドメインで指定する場合

```bash
# /home/kusanagi/wordpressにwp.lifegadget.meでアクセス
$ kusanagi setting --fqdn wp.lifegadget.me wordpress
```

## FTP の設定

### vsftpd のインストール

```
$ yum -y install vsftpd
```

### 設定ファイル修正

```
$ vim /etc/vsftpd/vsftpd.conf
```

以下のように修正して保存

- `anonymous_enable=YES` を `anonymous_enable=NO` に変更
- `ascii_upload_enable=YES` と `ascii_download_enable=YES` の先頭の `#` を削除
- `use_localtime=YES` を末尾に追加

### vsftpd の起動

```
$ service vsftpd start
```

### vsftpd の自動起動設定

```
$ chkconfig vsftpd on
```

### FTP 接続できるディレクトリの所有者を t_maeda に変更

```
$ chown t_maeda /var/www/lifegadget/
```

## ユーザーの追加

### 管理ユーザーの追加

#### ユーザーの追加

```
$ useradd t_maeda
```

#### パスワードの設定

```
$ passwd t_maeda
```

#### ユーザーに root 権限を与える

##### t_maeda を wheel グループに追加

```
$ usermod -G wheel t_maeda
```

##### wheel グループに所属するユーザーのみ root 権限が使えるように設定

```
vim /etc/pam.d/su
```

- auth required pam_wheel.so use_uid の先頭の#を削除

### 一般ユーザーの追加

#### ユーザーの追加

```
$ useradd k_baba
```

#### 追加したユーザーのパスワード設定

```
$ passwd k_baba
```

## グループの追加

```
$ groupadd lifegadget
```

### 追加したグループの確認

```
$ cat /etc/group
```

### グループにユーザーを追加

```
$ usermod -aG t_maeda lifegadget
$ usermod -aG lifegadget t_maeda
$ usermod -aG lifegadget k_baba
$ usermod -aG lifegadget kusanagi
```

### ディレクトリの所有者を追加したグループに変更

```
$ chgrp -R lifegadget kusanagi
```

### 権限変更

```
$ chmod 741 kusanagi
```

## WP のインストール

- 160.16.57.166 にアクセス
- 手順に従って WP をインストール

## プラグインのインストール

インストールする度に以下が聞かれる

```
ホスト名: localhost
ユーザー名: kusanagi
パスワード: LifeGa1228
```
