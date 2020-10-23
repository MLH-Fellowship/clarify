import React from 'react';
import { validateRoomKey } from '../services/firebase'

import { Input } from 'antd';

import { withRouter } from 'react-router-dom'; // <--- import `withRouter`. We will use this in the bottom of our file.

function JoinRoomForm(props) {

  return (
    <Input placeholder='#'
      id='room-code-input'
      size={'large'} onPressEnter={(value) => validateRoomKey(value, props)} />
  );
}

export default withRouter(JoinRoomForm);