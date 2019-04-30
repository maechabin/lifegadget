import React from 'react';
import { Link } from 'react-router-dom';

function ArchiveTag(props: any): JSX.Element {
  let tag = <></>;

  if (props.hasTagNames === true && props.tags.length > 0) {
    tag = props.tags.map((tags: { name: string; slug: string }, index: number) => (
      <span key={tags.slug}>
        #<Link to={`/tag/${props.article.tags[index]}`}>{tags.name}</Link>
      </span>
    ));
  }

  return (
    <div className="article__tag">
      <i className="fa fa-tag" /> {tag}
    </div>
  );
}

export default ArchiveTag;
