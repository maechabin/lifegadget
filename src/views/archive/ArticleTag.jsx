import React from 'react';
import { Link } from 'react-router';

const ArticleTag = (props) => {
  const tag = (props.gettedTag === false && props.tags.length === 0) ? '' : props.tags.map(
    (tags, i) => (
      <span key={tags.slug}>
        #<Link to={`/tag/${props.article.tags[i]}`}>{tags.name}</Link>
      </span>
    ),
  );
  return (
    <div className="article__tag">{tag}</div>
  );
};
ArticleTag.propTypes = {
  article: React.PropTypes.shape({
    tags: React.PropTypes.array,
  }),
  tags: React.PropTypes.arrayOf(React.PropTypes.object),
  gettedTag: React.PropTypes.bool.isRequired,
};

export default ArticleTag;
