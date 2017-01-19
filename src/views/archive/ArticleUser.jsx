import React from 'react';

const ArticleUser = (props) => {
  const getUser = userList => id => userList.map(
    (user, i) => (user.id === id ? i : null),
  );
  const userId = getUser(props.user)(props.article.author);
  const id = userId.find(id => id != null);
  const user = (props.nameOnly) ? <p>{props.user[id].slug}</p> : (
    <section>
      <h3>この記事を書いた人</h3>
      <img src={props.user[id].avatar_urls['96']} alt={props.user[id].slug} />
      <p>{props.user[id].slug}</p>
      <p>{props.user[id].description}</p>
    </section>
  );
  return (
    <div>
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
