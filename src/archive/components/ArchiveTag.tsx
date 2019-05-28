import React from 'react';
import { Link } from 'react-router-dom';

function ArchiveTag(props: any): JSX.Element {
  let tagElement = <></>;

  if (props.article.tagNames && props.article.tagNames.length > 0) {
    tagElement = props.article.tagNames.map(
      (tag: { name: string; slug: string }, index: number) => (
        <span key={tag.slug}>
          #<Link to={`/tag/${props.article.tags[index]}`}>{tag.name}</Link>
        </span>
      ),
    );
  }

  return (
    <div className="article__tag">
      <i className="fa fa-tag" /> {tagElement}
    </div>
  );
}

export default ArchiveTag;
