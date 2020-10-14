import React from 'react';

// Components
import Questions from './Questions';
import Poll from './Poll';

// Styles
import 'bootstrap/dist/css/bootstrap.css';
import 'react-notifications/lib/notifications.css';
import 'antd/dist/antd.css';
import '../styles/format.css';

import { useParams } from "react-router";

function Room(props) {
    let { id } = useParams();
    return (
        <React.StrictMode>

            <h1 style={{ padding: 25 }}>clarify</h1>
            <div id='flexbox'>
                <div class='questions'>
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