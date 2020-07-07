import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import './assets/css/reset.css';
import './index.css';
import App from './App';

import compiler from './store/reducer/'



const middleware = [
  thunkMiddleware
].filter(Boolean);
let createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
let store = createStoreWithMiddleware(compiler);

ReactDOM.render(
  <Provider store={store}>
    <div className="l-wrapper">
      <Router path='/' component={App}>
        <Route path="*" name="Router" component={App}/>
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
);
