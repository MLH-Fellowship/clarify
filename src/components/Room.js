import React from 'react';
import { useParams } from 'react-router';
import { Row } from 'antd';

// Components
import Questions from './Questions';
import Poll from './Poll';

// Styles
import 'bootstrap/dist/css/bootstrap.css';
import 'react-notifications/lib/notifications.css';
import 'antd/dist/antd.css';
import '../styles/format.css';

// Logo
import logo from '../icons/diamond.png'

function Room(props) {
    let { id } = useParams();
    return (
        <React.StrictMode>
            {/* <img src={logo} width='45px' height='45px' /> TODO: Put on same row */}
            <h1 style={{ padding: 25 }}>clarify</h1>
            <div id='flexbox'>
                <div class='questions'>
                    <h3> Questions </h3>
                    <Questions roomId={id} />
                </div>
                <div class='poll'>
                    <Poll roomId={id} />
                </div>
            </div>

        </React.StrictMode>
    );
}

export default Room;