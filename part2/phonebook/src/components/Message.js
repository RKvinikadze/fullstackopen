import React from 'react';

const Message = props => {
  const { message, type } = props;

  return <p className={type}>{message}</p>;
};

export default Message;
