// Title component to display the title
import React from 'react';

const Title = ({ title, subtitle }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p className="subtitle">{subtitle}</p>
    </div>
  );
};

export default Title;
