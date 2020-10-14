import React, { useState } from 'react';
import { Form, Input, message, Button } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons'
import { firebase, auth, addQuestion } from '../services/firebase';
import Avatars from '../images';

const QuestionForm = ({ user, roomId }) => {
  const [form] = Form.useForm();
  const [avatarIndex, setIndex] = useState(1);
  var avatar = Avatars[avatarIndex];

  auth.onAuthStateChanged(function (user) {
    if (user) {
      var seedrandom = require('seedrandom');
      var rng = seedrandom(user.uid);
      var i = Math.floor(rng() * 49);
      setIndex(i);
      avatar = Avatars[avatarIndex];
    }
  });

  const success = () => {
    message.success({
      content: 'Question added'
    });
  };

  // TODO: don't hardcode this
  const tempName = 'anonymous';

  const onFinish = values => {
    if (values.questionBox.replace(/\s/g, '').length) {

      // Create new question document
      const data = {
        user: tempName,
        question: values.questionBox,
        likes: 0,
        created: firebase.firestore.Timestamp.fromDate(new Date()),
        avatar: avatar
      };
      addQuestion(roomId, data, success);
    }
    form.resetFields();
  }

  return (
    <>
      <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
        <div style={{marginTop: '10px', marginLeft: '5px'}}>
        <Form.Item name='questionBox'>
          <Input placeholder="Ask a question..."
            style={{
              borderRadius: '5px',
              backgroundColor: '#f0f0f0',
              minWidth: '620px'
            }} size={'medium'} bordered={false} />
        </Form.Item>
        </div>
        <div style={{marginTop: '10px'}}>
        <Form.Item>
          <Button type='primary' shape='circle' icon={<ArrowUpOutlined />} size={'medium'} htmlType='submit' />
        </Form.Item>
        </div>
        
      </Form>
    </>
  )
}

export default QuestionForm;