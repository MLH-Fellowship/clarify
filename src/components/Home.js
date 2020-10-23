import React from 'react';

import CreateRoomForm from './CreateRoomForm';
import JoinRoomForm from './JoinRoomForm';

// Logo
import logo from '../icons/clarifylogowhite.png';

function Home() {
  return (
    <>
      <div id='home-page'>
        <div className='home-header'>
          <img src={logo} alt='clarify logo' width='25px' height='auto' style={{ marginRight: 6, marginBottom: 4 }} />
        Clarify
        </div>
        <div id='home-body'>
          <div id='home-form'>
            <CreateRoomForm />
            <div id='join-room-form'>
              <div style={{ color: 'white', fontSize: '20px' }}>or enter an existing room code</div>
              <JoinRoomForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );

}

export default Home;