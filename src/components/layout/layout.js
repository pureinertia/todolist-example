// @flow

import React from 'react';
import NavBar from '../navbar';
import './layout.scss';

type Props = {
  children: React.Node,
};

const Layout = (props: Props) => {
  const { children } = props;
  return (
    <div className="layout">
      <div className="layout--side">
        <NavBar />
      </div>
      <section className="layout--main">
        {children}
      </section>
    </div>
  );
};

export default Layout;
