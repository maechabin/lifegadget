import React from 'react';
import { Link } from 'react-router';

const List = (props) => {
  const list = (props.resetList && props.routingKey !== '') ? '' : props.index.map(
    item => (
      <li key={item.id}>
        <Link to={`/archive/${item.id}`}>{item.title.rendered}</Link>
        <p>{item.date}</p>
      </li>
    ),
  );
  return (
    <main className="index">
      <ul>{list}</ul>
    </main>
  );
};
List.propTypes = {
  resetList: React.PropTypes.bool,
  routingKey: React.PropTypes.string,
  index: React.PropTypes.array,
};

export default List;