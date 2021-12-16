// Main layout file that contains all pages indluding navbar for all of them
import React from 'react';
import Navs from './Navs';
import Title from './Title';

const styles = {
  padding: '5px',
  color: 'white',
};

const Layout = ({ children }) => {
  return (
    <div style={styles}>
      <Title
        title="Movie Search Engine"
        subtitle="Sign in and search for any movie/tvshow or actor and add the movie to your favs"
      />
      <Navs />

      {children}
    </div>
  );
};

export default Layout;
