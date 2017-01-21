import React from 'react';

const IndexTitle = (props) => {
  console.log(props);
  const pathname = props.location.pathname.split('/')[1];

  const getCategory = categoryList => id => categoryList.map(
    category => (category.id === parseInt(id) ? category.name : null),
  );
  const getAuthor = authorList => id => authorList.map(
    author => (author.id === parseInt(id) ? author.name : null),
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
        return `「${props.params.tag}」タグの記事一覧`;
      case 'author':
        const getAuthorName = getAuthor(props.author);
        const authorName = getAuthorName(props.params.author)
        return `${authorName}の記事一覧`;
      default:
        return '記事一覧';
    }
  };
  const total = (props.resetList && props.routingKey !== '') ? '' : `全 ${props.total} 件`;

  return (
    <div className="index__title">
      <h2>{getTitle(pathname)}</h2>
      <p>{total}</p>
    </div>
  );
};
IndexTitle.propTypes = {
  category: React.PropTypes.arrayOf(React.PropTypes.object),
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string,
  }),
  params: React.PropTypes.shape({
    category: React.PropTypes.string,
    keyword: React.PropTypes.string,
    tag: React.PropTypes.string,
  }),
  resetList: React.PropTypes.bool,
  routingKey: React.PropTypes.string,
  total: React.PropTypes.number,
};

export default IndexTitle;
