// @flow

import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import face from '../../images/face.jpg';
import './navbar.scss';

library.add(faList);

type Props = {
  user: object,
};

const NavBar = (props: Props) => {
  const { user } = props;
  return (
    <nav className="nav-bar">
      <header className="nav-bar--header">
        <div
          className="nav-bar--header--photo"
          style={{ backgroundImage: `url(${face})` }}
          role="img"
          aria-label="User"
        />
        <h3>{user.name}</h3>
      </header>
      <ul className="nav-bar--list">
        <li>
          <a href="#/" className="nav-bar--list--item">
            <FontAwesomeIcon icon="list" />
            Team To-Do List
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
