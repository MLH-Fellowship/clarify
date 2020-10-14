import React from 'react';
import { Form, Input, message, Button } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons'
import { firebase, addQuestion } from '../services/firebase';
import '../styles/format.css';

const QuestionForm = ({ user, roomId }) => {
  const [form] = Form.useForm();

  const success = () => {
    message.success({
      content: 'Question added'
    });
  };

  // TODO: don't hardcode this
  const tempName = 'anonymous';

  const onFinish = values => {
    if (values.questionBox.replace(/\s/g, '').length) {
      const data = {
        user: tempName,
        question: values.questionBox,
        likes: 0,
        created: firebase.firestore.Timestamp.fromDate(new Date())
      };
      addQuestion(roomId, data, success);
    }
    form.resetFields();
  }

  return (
    <>
      <Form id = 'questionForm' form={form} name="horizontal_login" layout="inline" 
            onFinish={onFinish}>
        <Form.Item name='questionBox'>
          <Input placeholder="Ask a question..."
            style={{
              borderRadius: '5px',
              backgroundColor: '#f0f0f0',
              margin: '5px',
              width: '100%'
            }} size={'medium'} bordered={false} />
        </Form.Item>
        <Form.Item>
          <Button type='primary' shape='circle' icon={<ArrowUpOutlined />} size={'medium'} htmlType='submit' />
        </Form.Item>
      </Form>
    </>
  )
}

export default QuestionForm;