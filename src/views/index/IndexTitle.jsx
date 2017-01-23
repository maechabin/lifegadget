import React from 'react';

const IndexTitle = (props) => {
  const pathname = props.location.pathname.split('/')[1];

  const getCategory = categoryList => id => categoryList.map(
    category => (category.id === parseInt(id, 10) ? category.name : null),
  );
  const getAuthor = authorList => id => authorList.map(
    author => (author.id === parseInt(id, 10) ? author.name : null),
  );
  const getTitle = (name) => {
    switch (name) {
      case 'search':
        return `「${props.params.keyword}」の検索結果`;
      case 'category': {
        const getCategoryName = getCategory(props.category);
        const categoryName = getCategoryName(props.params.category).find(i => i != null);
        return `「${categoryName}」カテゴリの記事一覧`;
      }
      case 'tag':
        return `「${props.tagName}」タグの記事一覧`;
      case 'author': {
        const getAuthorName = getAuthor(props.author);
        const authorName = getAuthorName(props.params.author);
        return `${authorName}の記事一覧`;
      }
      default:
        return '記事一覧';
    }
  };

  const title = (props.resetList && props.routingKey !== '') ? '' : getTitle(pathname);
  const page = props.params.page ? props.params.page : '1';
  const total = (props.resetList && props.routingKey !== '') ? '' : `全 ${props.total} 件 - ${page}ページ目`;

  return (
    <div className="index__title">
      <h2>{title}</h2>
      <p>{total}</p>
    </div>
  );
};
IndexTitle.propTypes = {
  author: React.PropTypes.arrayOf(React.PropTypes.object),
  category: React.PropTypes.arrayOf(React.PropTypes.object),
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string,
  }),
  params: React.PropTypes.shape({
    author: React.PropTypes.string,
    category: React.PropTypes.string,
    keyword: React.PropTypes.string,
    page: React.PropTypes.string,
    tag: React.PropTypes.string,
  }),
  resetList: React.PropTypes.bool,
  routingKey: React.PropTypes.string,
  tagName: React.PropTypes.string,
  total: React.PropTypes.number,
};

export default IndexTitle;
