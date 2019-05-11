import React from 'react';

function SearchForm(props: any): JSX.Element {
  function handleChange(event: React.FormEvent<HTMLInputElement>): void {
    const keyword = event.currentTarget.value;
    props.dispatchChangeSearchKeyword(keyword);
  }

  function handleClick(): void {
    props.dispatchSetSearchKeyword(props.inputValue);
    props.dispatchChangeSearchKeyword('');
    props.history.push(`/search/${props.inputValue}`);
  }

  return (
    <div className="searchform">
      <input
        type="text"
        placeholder="キーワード"
        onChange={handleChange}
        value={props.inputValue}
      />
      <button onClick={handleClick} disabled={!!!props.inputValue}>
        検索
      </button>
    </div>
  );
}

export default SearchForm;
