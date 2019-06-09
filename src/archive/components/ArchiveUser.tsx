import React from 'react';
import { Link } from 'react-router-dom';

import { getUserFactory, User } from '../../domains/wordpress';

type PropsType = {
  /** 投稿しているユーザー情報一覧 */
  users: User[];
  /** 投稿者ID */
  authorId: number;
  /** 名前だけ表示するかフラグ */
  shouldDisplayOnlyName: boolean;
};

function ArchiveUser({ users, authorId, shouldDisplayOnlyName }: PropsType): JSX.Element {
  const author = getUserFactory(users)(authorId);

  let userComponent = <></>;

  if (author) {
    userComponent = shouldDisplayOnlyName ? (
      // ユーザー名のみ表示
      <p>
        <i className="fa fa-pencil" /> <Link to={`/author/${author.id}`}>{author.name}</Link>
      </p>
    ) : (
      // ユーザー情報を表示
      <section>
        <h3>この記事を書いた人</h3>
        <figure>
          <img src={author.avatar_urls['96']} alt={author.name} />
          <figcaption>
            <Link to={`/author/${author.id}`}>{author.name}</Link>
          </figcaption>
        </figure>
        <p>{author.description}</p>
      </section>
    );
  }

  return (
    <div className={shouldDisplayOnlyName ? 'article__user_name' : 'article__user'}>
      {userComponent}
    </div>
  );
}

export default ArchiveUser;
