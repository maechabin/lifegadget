import React from 'react';

function SearchForm(props: any): JSX.Element {
  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    const keyword = event.currentTarget.value;
    props.dispatchChangeSearchKeyword(keyword);
  }
  function handleClick() {
    props.dispatchSetSearchKeyword(props.inputValue);
    props.dispatchChangeSearchKeyword('');
    props.router.push({
      pathname: `/search/${props.inputValue}`,
    });
  }
  return (
    <div className="searchform">
      <input
        type="text"
        placeholder="キーワード"
        onChange={handleChange}
        value={props.inputValue}
      />
      <button onClick={handleClick}>検索</button>
    </div>
  );
}

export default SearchForm;
