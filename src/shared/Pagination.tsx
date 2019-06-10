import React from 'react';
import { Link } from 'react-router-dom';

/** 表示するページの数 */
const PAGE_LENGTH = 5;

/** Path名 */
enum PathName {
  Search = 'search',
  Category = 'category',
  Tag = 'tag',
  Author = 'author',
}

type PropsType = {
  totalPages: number;
  match: any;
  location: any;
  isHiddenIndexList: boolean;
};

function Pagination(props: PropsType): JSX.Element {
  const totalPages: number = props.totalPages;
  const paramsPage: number = Number(props.match.params.page) || 1;
  const pager = new Array(PAGE_LENGTH).fill(paramsPage);
  const pathname: PathName = props.location.pathname.split('/')[1];

  function createPath(pathName: PathName, matchParams: any): string {
    switch (pathName) {
      case PathName.Search:
        return `/${PathName.Search}/${matchParams.keyword}/`;
      case PathName.Category:
        return `/${PathName.Category}/${matchParams.category}/`;
      case PathName.Tag:
        return `/${PathName.Tag}/${matchParams.tag}/`;
      case PathName.Author:
        return `/${PathName.Author}/${matchParams.author}/`;
      default:
        return '/';
    }
  }

  function createPrevLink(): JSX.Element {
    if (paramsPage === 1) {
      return <li>前へ</li>;
    }
    if (totalPages >= PAGE_LENGTH && paramsPage > totalPages - PAGE_LENGTH) {
      return (
        <li>
          <Link to={`${createPath(pathname, props.match.params)}${totalPages - PAGE_LENGTH}`}>
            前へ
          </Link>
        </li>
      );
    }
    return (
      <li>
        <Link to={`${createPath(pathname, props.match.params)}${paramsPage - 1}`}>前へ</Link>
      </li>
    );
  }

  function createNextLink(): JSX.Element {
    if (paramsPage >= totalPages) {
      return <li>次へ</li>;
    }
    return (
      <li>
        <Link to={`${createPath(pathname, props.match.params)}${paramsPage + 1}`}>次へ</Link>
      </li>
    );
  }

  const pagination = pager.map((page: number, index: number) => {
    const number =
      page > totalPages - PAGE_LENGTH + 1 ? totalPages - PAGE_LENGTH + 1 - page + index : index;
    if (page + number > totalPages || page + number < 1) {
      return false;
    }
    if (page + number === paramsPage) {
      return (
        <li className="pagination__link_active" key={page + number}>
          {page + number}
        </li>
      );
    }
    return (
      <li key={page + number}>
        <Link to={`${createPath(pathname, props.match.params)}${page + number}`}>
          {page + number}
        </Link>
      </li>
    );
  });

  const pagenationElem = props.isHiddenIndexList ? (
    ''
  ) : (
    <ul>
      {createPrevLink()}
      {pagination}
      {createNextLink()}
    </ul>
  );

  return <div className="pagination">{pagenationElem}</div>;
}

export default Pagination;
