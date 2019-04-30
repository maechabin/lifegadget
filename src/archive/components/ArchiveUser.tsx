import React from 'react';
import { Link } from 'react-router-dom';

import { User } from '../../root/rootState';

function ArchiveUser(props: any): JSX.Element {
  function getUserFactory(users: User[]) {
    return (authorId: number): User | undefined => users.find((user: User) => user.id === authorId);
  }

  const user = getUserFactory(props.user)(props.article.author);

  let userElem = <></>;

  if (user) {
    userElem = props.shouldDisplayOnlyName ? (
      // ユーザー名のみ表示
      <p>
        <i className="fa fa-pencil" /> <Link to={`/author/${user.id}`}>{user.name}</Link>
      </p>
    ) : (
      // ユーザー情報を表示
      <section>
        <h3>この記事を書いた人</h3>
        <figure>
          <img src={user.avatar_urls['96']} alt={user.name} />
          <figcaption>
            <Link to={`/author/${user.id}`}>{user.name}</Link>
          </figcaption>
        </figure>
        <p>{user.description}</p>
      </section>
    );
  }

  return (
    <div className={props.shouldDisplayOnlyName ? 'article__user_name' : 'article__user'}>
      {userElem}
    </div>
  );
}

export default ArchiveUser;
