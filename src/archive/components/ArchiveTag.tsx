import React from 'react';
import { Link } from 'react-router-dom';

import { TagName } from '../archiveState';

type PropsType = {
  tags: number[];
  tagNames: TagName[];
};

function ArchiveTag({ tags, tagNames }: PropsType): JSX.Element {
  const tagComponent =
    tagNames && tagNames.length > 0 ? (
      tagNames.map((tagName: TagName, index: number) => (
        <span key={tagName.slug}>
          #<Link to={`/tag/${tags[index]}`}>{tagName.name}</Link>
        </span>
      ))
    ) : (
      <></>
    );

  return (
    <div className="article__tag">
      <i className="fa fa-tag" /> {tagComponent}
    </div>
  );
}

export default ArchiveTag;
