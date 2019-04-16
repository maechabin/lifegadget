import React from 'react';

function SearchForm(props: any): JSX.Element {
  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    props.handleChange(value);
  }
  function handleClick() {
    props.handleSend(props.inputValue);
    props.handleChange('');
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
