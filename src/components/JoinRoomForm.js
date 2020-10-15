import React from 'react';
import '../styles/home.css'
import { db, auth, checkRoomExists } from '../services/firebase'

import { message, Form, Input } from 'antd';

import { withRouter } from 'react-router-dom'; // <--- import `withRouter`. We will use this in the bottom of our file.

function JoinRoomForm(props) {
  const [form] = Form.useForm();

  // TODO: Only allow redirect if collection exists
  const onFinish = values => {
    var code = values;
    auth.signInAnonymously();
    message.success('Entered room');

    return props.history.push(`${code.questionBox}`);
  }

  // const validateRoomKey = async (rule, value, callback) => {
  //   return checkRoomExists(value);
  // }

  const validateRoomCode = (_, value) => {
    // var docRef = db.collection('rooms').doc(value);

    db.collection('rooms').doc(value).get().then(function (doc) {
      if (doc.exists) {
        return Promise.resolve();
      } else {
        return Promise.reject('Invalid room code');
      }
    }).catch(function (error) {
      return Promise.reject(error);
    });

    // if (value > 0) {
    //   return Promise.resolve();
    // }

    // return Promise.reject('Price must be greater than zero!');
  };

  return (
    <Form form={form} name='horizontal_login' layout='inline' onFinish={onFinish} validateTrigger='onSubmit'>
      <Form.Item name='questionBox'

        rules={[
          {
            validator: validateRoomCode,
          }
        ]}
      // validateStatus='validating' hasFeedback 
      >
        <Input placeholder='#'
          style={{
            borderRadius: '5px',
            backgroundColor: '#ffffff',
            margin: '12px',
            minWidth: '250px'
          }} size={'large'} bordered={false} id='validating' />
      </Form.Item>
    </Form>
  );
}

export default withRouter(JoinRoomForm);