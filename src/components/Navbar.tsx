import React from 'react';

export const Navbar: React.FC = () => (
  <nav>
    <div className="nav-wrapper blue darken-2 px1">
      <a href="/" className="brand-logo">React + TS</a>
      <ul className="right hide-on-med-and-down">
        <li><a href="/">ToDo list</a></li>
        <li><a href="/">Info</a></li>
      </ul>
    </div>
  </nav>
);
