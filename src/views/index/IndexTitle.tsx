import React from 'react';

const IndexTitle = (props: any) => {
  const pathname = props.location.pathname.split('/')[1];

  const getCategory = (categoryList: any) => (id: any) =>
    categoryList.map((category: any) => (category.id === parseInt(id, 10) ? category.name : null));
  const getAuthor = (authorList: any) => (id: any) =>
    authorList.map((author: any) => (author.id === parseInt(id, 10) ? author.name : null));
  const getTitle = (name: any) => {
    switch (name) {
      case 'search':
        return `「${props.match.params.keyword}」の検索結果`;
      case 'category': {
        const getCategoryName = getCategory(props.category);
        const categoryName = getCategoryName(props.match.params.category).find(
          (i: any) => i != null,
        );
        return `「${categoryName}」カテゴリの記事一覧`;
      }
      case 'tag':
        return `「${props.tagName}」タグの記事一覧`;
      case 'author': {
        const getAuthorName = getAuthor(props.author);
        const authorName = getAuthorName(props.match.params.author);
        return `${authorName}の記事一覧`;
      }
      default:
        return '記事一覧';
    }
  };

  const title = props.resetList && props.routingKey !== '' ? '' : getTitle(pathname);
  const page = props.match.params && props.match.params.page ? props.match.params.page : '1';
  const total =
    props.resetList && props.routingKey !== '' ? '' : `全 ${props.total} 件 - ${page}ページ目`;

  return (
    <div className="index__title">
      <h2>{title}</h2>
      <p>{total}</p>
    </div>
  );
};

export default IndexTitle;
