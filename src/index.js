import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { NotificationContainer } from 'react-notifications';

// Components
import Questions from './components/Questions';
import Poll from './components/Poll';
import Room from './components/Room';

// Styles
import 'bootstrap/dist/css/bootstrap.css';
import 'react-notifications/lib/notifications.css';
import 'antd/dist/antd.css';
import './styles/format.css';
import { auth } from "./services/firebase"

import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

/*
ReactDOM.render(
  <React.StrictMode>
      <Room />
  </React.StrictMode>
  ,
  document.getElementById('root')
)

ReactDOM.render(
  <React.StrictMode>
    
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
); */

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/*
auth().onAuthStateChanged(function(user) {
  console.log('works');
  if (user) {
    // User is signed in.
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    console.log(user);
    // ...
  } else {
    // User is signed out.
    // ...
  }
  // ...
}); */