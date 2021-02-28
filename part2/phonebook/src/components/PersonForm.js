import React from 'react';

const PersonForm = props => {
  return (
    <form onSubmit={props.Add} className="form">
      <div className="label-input">
        name: <input onChange={props.ChangeName} value={props.Name} />
      </div>
      <div className="label-input">
        number: <input onChange={props.ChangeNumber} value={props.Number} />
      </div>
      <div>
        <button className="addButton" type="submit">
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
