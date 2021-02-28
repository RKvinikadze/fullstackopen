import React from 'react';

const Persons = props => {
  return (
    <div className="Persons">
      {props.filtered.map((obj, i) => {
        return (
          <div key={i} className="Person">
            <p className="Name">{obj.name}</p>
            <p>{obj.number}</p>
            <p>
              <button onClick={() => props.Delete(obj)}>delete</button>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Persons;
