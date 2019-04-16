import React from 'react';
import { Link } from 'react-router-dom';

const ArchiveUser = (props: any) => {
  const getUser = (userList: any) => (id: any) =>
    userList.map((user: any, i: number) => (user.id === id ? i : null));
  const userId = getUser(props.user)(props.article.author);
  const id = userId.find((id: any) => id != null);
  const user = props.nameOnly ? (
    <p>
      <i className="fa fa-pencil" />{' '}
      {/*<Link to={`/author/${props.user[id].id}`}>{props.user[id].name}</Link>*/}
    </p>
  ) : (
    <section>
      <h3>この記事を書いた人</h3>
      <figure>
        {/*<img src={props.user[id].avatar_urls['96']} alt={props.user[id].name} />*/}
        <figcaption>
          {/*<Link to={`/author/${props.user[id].id}`}>{props.user[id].name}</Link>*/}
        </figcaption>
      </figure>
      {/*<p>{props.user[id].description}</p>*/}
    </section>
  );
  return <div className={props.nameOnly ? 'article__user_name' : 'article__user'}>{user}</div>;
};

export default ArchiveUser;
