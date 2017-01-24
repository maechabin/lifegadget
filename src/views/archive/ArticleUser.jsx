import React from 'react';
import { Link } from 'react-router';

const ArticleUser = (props) => {
  console.log(props);
  const getUser = userList => id => userList.map(
    (user, i) => (user.id === id ? i : null),
  );
  const userId = getUser(props.user)(props.article.author);
  const id = userId.find(id => id != null);
  const user = (props.nameOnly) ? (
    <p className="article__user_name">
      <i className="fa fa-user"></i> <Link to={`/author/${props.user[id].id}`}>{props.user[id].name}</Link>
    </p>
  ) : (
    <section>
      <h3>この記事を書いた人</h3>
      <figure>
        <img src={props.user[id].avatar_urls['96']} alt={props.user[id].name} />
        <figcaption>
          <Link to={`/author/${props.user[id].id}`}>{props.user[id].name}</Link>
        </figcaption>
      </figure>
      <p>{props.user[id].description}</p>
    </section>
  );
  return (
    <div className="article__user">
      {user}
    </div>
  );
};
ArticleUser.propTypes = {
  article: React.PropTypes.shape({
    author: React.PropTypes.number,
  }),
  nameOnly: React.PropTypes.bool,
  user: React.PropTypes.arrayOf(React.PropTypes.object),
};

export default ArticleUser;
