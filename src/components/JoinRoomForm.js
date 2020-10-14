import React from "react";
import "../styles/home.css"
import { auth } from "../services/firebase"

import { message, Form, Input } from 'antd';

import { withRouter } from 'react-router-dom'; // <--- import `withRouter`. We will use this in the bottom of our file.

function JoinRoomForm(props) {
  const [form] = Form.useForm();

  // TODO: Only allow redirect if collection exists
  const onFinish = values => {
    var code = values;
    auth.signInAnonymously();

    const success = () => {
      message.success({
        content: 'Entered room'
      });
    };
    success();

    return props.history.push(`${code.questionBox}`);
  }

  return (
    <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
      <Form.Item name='questionBox'>
        <Input placeholder="#"
          style={{
            borderRadius: '5px',
            backgroundColor: '#ffffff',
            margin: '5px',
            minWidth: '300px'
          }} size={'large'} bordered={false} />
      </Form.Item>
    </Form>
  );
}

export default withRouter(JoinRoomForm);