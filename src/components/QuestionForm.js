import React from 'react';
import { Form, Input, message } from 'antd';
import { db, firebase } from '../services/firebase';

const QuestionForm = ({ user }) => {
  const { Search } = Input;

  const success = () => {
    message.success({
      content: 'Question added'
    });
  };

  // TODO: don't hardcode this
  const tempName = 'anonymous';

  // onFinish uses the value from Search because Form returns an empty object due to being used as a wrapper
  const onFinish = values => {
    if (typeof values === 'string') {
      if (values !== '') {
        const data = {
          user: tempName,
          question: values,
          likes: 0,
          created: firebase.firestore.Timestamp.fromDate(new Date())
        };
        db.collection('questions').add(data)
          .then(() => {
            success();
          })
          .catch(error => {
            console.log('Addition of question failed');
          });
      }
    }
  };

  return (
    <>
      <Form onFinish={onFinish}>
        <Form.Item>
          <Search placeholder="Write a question..." size='medium' onSearch={onFinish} bordered={false} enterButton='Ask' />
        </Form.Item>
      </Form>
    </>
  )
}

export default QuestionForm;