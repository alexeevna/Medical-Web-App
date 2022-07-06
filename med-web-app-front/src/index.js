import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {HashRouter, Router} from "react-router-dom";
import {createBrowserHistory} from 'history'

const history = createBrowserHistory()

ReactDOM.render(
    // <React.StrictMode>
    // <Router history={history}>
    <HashRouter>
        <App/>
    </HashRouter>
    // </Router>
    // </React.StrictMode>
    ,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
