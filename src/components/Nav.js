import React from 'react';
import { Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Go to home page</Link>
        </li>
        <li>
          <Link to="/favs">Go to favs page</Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
