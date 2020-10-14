import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from '../serviceWorker';
// import { NotificationContainer } from 'react-notifications';

// Components
import Questions from './Questions';
import Poll from './Poll';

// Styles
import 'bootstrap/dist/css/bootstrap.css';
import 'react-notifications/lib/notifications.css';
import 'antd/dist/antd.css';
import '../styles/format.css';

export default class Room extends React.Component{
    render() {
        return(
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
        );
    }
}

