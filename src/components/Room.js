import React from 'react';
import { useParams } from 'react-router';
import { Tooltip, message } from 'antd';

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

    function onClick() {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = id;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        const success = () => {
            message.success({
                content: 'Code copied'
            });
        };
        success();

    }


    return (
        <React.StrictMode>
            {/* <img src={logo} width='45px' height='45px' /> TODO: Put on same row */}
            <h1 style={{ padding: 25, fontFamily: 'sans-serif', fontSize: '30px' }}>clarify</h1>

            <Tooltip placement="top" title={'Click to copy'}>
                <button className='joinCodeBadge' onClick={onClick}>Join Code: {id}</button>
            </Tooltip>
            <div id='flexbox'>
                <div class='questions'>
                    <h3> Questions </h3>
                    <div class='questionDiv'>
                        <Questions roomId={id} />
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