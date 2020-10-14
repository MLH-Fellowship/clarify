import React, { Component } from 'react';
import { notification } from 'antd'
import { SmileTwoTone } from '@ant-design/icons';
import { withRouter } from 'react-router-dom'; // <--- import `withRouter`. We will use this in the bottom of our file.

import { createRoom, auth } from "../services/firebase"

const CreateRoomForm = (props) => {
  function generate() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function success(roomId) {
    notification.open({
      message: 'Your Room is Live!',
      description:
        `Share your room code now: ${roomId}`,
      icon: <SmileTwoTone style={{ twoToneColor: '#52c41a' }} />,
    });
  };


  function submitForm(e) {
    e.preventDefault()

    // Generate unique ID
    var roomId = generate();

    // Add a new poll collection initialized the options and count: 0
    createRoom(roomId);
    success(roomId);
    return props.history.push(`${roomId}`) // <--- The page you want to redirect your user to.
  }

  return (
    <div>
      <form onSubmit={submitForm}>
        <button type="submit">Submit</button>
      </form>
    </div>
  );

}

export default withRouter(CreateRoomForm); // <--- make sure to wrap your component with `withRouter()`