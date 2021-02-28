import React from 'react';

const Filter = props => {
  return (
    <div className="label-input">
      filter shown with{' '}
      <p>
        <input onChange={props.Filter} />
      </p>
    </div>
  );
};

export default Filter;
