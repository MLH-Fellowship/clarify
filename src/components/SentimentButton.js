import React from 'react';
import Button from 'react-bootstrap/Button';

const SentimentButton = (props) => {
  return (
    <>
      <Button variant='primary' name={props.text} onClick={props.onClick} style={{ margin: 8 , backgroundColor: "paleturquoise", borderColor:"paleturquoise"}}>
        {props.text}
      </Button>
    </>
  );
}

export default SentimentButton;              