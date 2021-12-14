import React from 'react';
import Navs from './Navs';
import Title from './Title';

const styles = {
  "padding": "5px",
  "color":"white"
}

const Layout = ({ children }) => {
  return (
    <div style={styles}>
      <Title
        title="Box Office"
        subtitle="Are you looking for a movie or an actor?"
      />
      <Navs />

      {children}
    </div>
  );
};

export default Layout;
