import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import 'antd/dist/antd.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import "bootstrap/dist/css/bootstrap.css";
import "react-notifications/lib/notifications.css";

import { NotificationContainer } from "react-notifications";
import Questions from "./components/Questions";
import Poll from "./components/Poll";
import './styles/format.css';

ReactDOM.render(
  <React.StrictMode>
    <NotificationContainer />
    <div id='flexbox'>
      <div class='questions'>
        <Questions />
      </div>
      <div class='poll'>
        <Poll />
      </div>
    </div>


  </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
