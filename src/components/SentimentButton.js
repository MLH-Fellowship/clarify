import React from 'react';
import Button from 'react-bootstrap/Button';

const SentimentButton = (props) => {
  return (
    <>
      <Button variant='primary' name={props.text} onClick={props.onClick} style={{ margin: 8 }}>
        {props.text}
      </Button>
    </>
  );
}

export default SentimentButton;              