import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout(props) {
  return (
    <div className="l-body">
      <Header/>
      <main className="l-main">
        {props.children}
      </main>
      <Footer/>
    </div>
  );
}

export default Layout;
