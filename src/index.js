// index.js: This is the javascript file corresponding to index.html

import React from 'react';  // Load react, react-dom, index.css
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render() will render our app and then load it here -> document.getElementById('root'). We will get it in root id in index.html
ReactDOM.render(  
  //React's StrictMode is sort of a helper component that will help you write better react components
  // App Component "<App />" has to be loaded into an html element with id root. This is a div element present in index.html
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
