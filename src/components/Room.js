import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { Tooltip, message } from 'antd';
import { getRoom } from '../services/firebase'

// Components
import Questions from './Questions';
import Poll from './Poll';

// Styles
import 'bootstrap/dist/css/bootstrap.css';
import 'react-notifications/lib/notifications.css';
import 'antd/dist/antd.css';
import '../styles/format.css';

// Logo
import logo from '../icons/clarifylogoblue.png'

function Room(props) {
    const [room, setRoom] = useState();
    const [willRedirect, setwillRedirect] = useState(false);
    let { id } = useParams();

    useEffect(() => {
        async function getRoomName() {
            var room = await getRoom(id);
            room ? setRoom(room) : setwillRedirect(true);
        }
        getRoomName();
    }, []);

    function onClick() {
        var dummy = document.createElement('textarea');
        document.body.appendChild(dummy);
        dummy.value = id;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        const success = () => {
            message.success({
                content: 'Code copied'
            });
        };
        success();
    }

    if (willRedirect) {
        return <Redirect to='/' />
    }

    return (
        <React.StrictMode>
            <div className='site-header'>
                {/* <Link to='/'> */}
                <img src={logo} alt='clarify logo' width='25px' height='auto' style={{ marginRight: 6, marginBottom: 8 }} />
                <span id='clarify-title'>Clarify</span>
                {/* </Link> */}
            </div>
            <Tooltip placement='top' title={'Click to copy'}>
                <button className='joinCodeBadge' onClick={onClick}>{room ? `Join Code: ${id}` : 'Join Code:'}</button>
            </Tooltip>
            <div style={{ paddingLeft: 40, paddingTop: 40, fontSize: '18px' }}>{room ? room.roomName : 'My Room'}</div>

            <div className='flex-container'>
                <div className='row'>
                    <div className='column-q'>
                        <p style={{ fontWeight: 'bold' }}>Question Board</p>
                        <Questions roomId={id} />
                    </div>
                    <div className='column-p'>
                        <p style={{ fontWeight: 'bold' }}>Class Sentiment</p>
                        <Poll roomId={id} />
                    </div>
                </div>
            </div>
        </React.StrictMode>
    );
}

export default Room;