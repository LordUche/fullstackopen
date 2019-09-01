import React from 'react';

const Notification = ({ message }) => {
  if (message === null) return null;
  const { text, type } = message;
  return <div className={`notification ${type}`}>{text}</div>;
};

export default Notification;
