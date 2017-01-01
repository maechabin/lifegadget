import React from 'react';

const SearchForm = (props) => {
  function handleChange(e) {
    const value = e.target.value;
    props.handleChange(value);
  }
  function handleClick(e) {
    e.preventDefault();
    props.handleSend(props.inputValue);
    props.router.push({
      pathname: `/search/${props.inputValue}`,
    });
  }
  return (
    <div className="searchform">
      <input type="text" onChange={handleChange} />
      <button onClick={handleClick}>検索</button>
    </div>
  );
};

export default SearchForm;