import React from 'react';
import Button from 'react-bootstrap/Button';
import { Radio } from 'antd';

const SentimentButton = (props) => {
  return (
    <>
      <Radio.Button value={props.text} buttonStyle="solid" style={{ minWidth: "100px", textAlign: "center", backgroundColor: "#1890ff" }}>
        {props.text}
      </Radio.Button>
    </>
  );
}

export default SentimentButton;              