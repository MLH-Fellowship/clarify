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

import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
