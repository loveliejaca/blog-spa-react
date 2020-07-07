import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './container/Home';
import Post from './container/Post';
import PostNew from './container/PostNew';

import './App.css';

function App() {

  return (
    <div className="l-body">

      <Router>
        <Header/>
        <Route
          name= "Home"
          exact
          path= "/"
          component={Home}
        />

        <Route
          name= "Create New Post"
          exact
          path= "/create-new-post"
          component={PostNew}
        />

        <Route
          name= "Post"
          exact
          path= "/post/:postId"
          component={Post}
        />

        <Footer/>
      </Router>
    </div>
  );
}

export default App;
