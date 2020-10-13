import React from 'react';
import { Radio } from 'antd';

const SentimentButton = (props) => {
  return (
    <>
      <Radio.Button value={props.text} buttonStyle='solid' style={{ minWidth: '80px', textAlign: 'center', fontSize: '18px', backgroundColor: props.color }}>
        {props.text}
      </Radio.Button>
    </>
  );
}

export default SentimentButton;              