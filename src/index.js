import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { NotificationContainer } from "react-notifications";

// Components
import Questions from "./components/Questions";
import Poll from "./components/Poll";

// Styles
import "bootstrap/dist/css/bootstrap.css";
import "react-notifications/lib/notifications.css";
import 'antd/dist/antd.css';

import './styles/index.css';
import './styles/format.css';

ReactDOM.render(
  <React.StrictMode>
    <NotificationContainer />
    <h1 style={{ padding: 25 }}>clarify</h1>
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
