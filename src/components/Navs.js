import React from 'react';
import { Link } from 'react-router-dom';

const LINKS = [
  { to: '/', text: 'Home' },
  { to: '/favs', text: 'Favs' },
];

const linkStyle = {
  "display": "block",
  "text-align": "center",
  "margin": "10px auto 10px auto",
  "width": "60px",
  "padding": "10px",
  "backgroundColor": "lightGrey",
  "border-radius": "25px",
  "text-decoration": "none"
}

const Navs = () => {
  return (
    <div>
        {LINKS.map(item => (
            <Link style={linkStyle} to={item.to}>{item.text}</Link>
        ))}
    </div>
  );
};

export default Navs;