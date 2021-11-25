import React from 'react';
import { Nav } from './Nav';
import Title from './Title';

const Layout = ({ children }) => {
  return (
    <div>
      <Title
        title="Movie Search Engine"
        desc="Search for the best titles. Just type in the search box to begin"
      />
      <Nav />
      {children}
    </div>
  );
};

export default Layout;
