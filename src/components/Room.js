import React from 'react';
import { useParams } from 'react-router';
import { Row } from 'antd';

// Components
import Questions from './Questions';
import Poll from './Poll';
import QuestionForm from './QuestionForm';

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
            <h1 style={{ padding: 25, fontFamily:'sans-serif', fontSize: '80px', color: '#007bff'}}>clarify</h1>
            <div id='flexbox' style={{backgroundColor: "#e6f9ff"}}>
                <div class='questions'>
                    <h3> Questions </h3>
                    <div class = 'questionDiv'>
                        <Questions roomId={id}/>
                    </div>
                </div>
                <div class='poll'>
                    <Poll roomId={id} />
                </div>
            </div>
        </React.StrictMode>
    );
}

export default Room;