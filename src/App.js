import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import { routes } from './utils/routes';
// import AuthRegistration from "./components/auth/AuthRegistration";

import './App.css';
import Home from './pages/Home';
import Post from './pages/Post';
import PostForm from './pages/PostForm';

function App() {
  // const { isScrollLock, isLoginRegistrationForm } = useUtils();

  return (
    <Router>

      <Route exact path={routes.home} component={Home} />
      <Route exact path={routes.postCreate} component={PostForm} />
      <Route exact path={routes.post} component={Post} />
      <Route exact path={routes.postEdit} component={PostForm} />
    </Router>
  );
}

export default App;
