import React from 'react';

const Title = ({ title, desc }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{desc}</p>
    </div>
  );
};

export default Title;
