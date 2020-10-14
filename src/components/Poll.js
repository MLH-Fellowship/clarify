import React, { useState, useEffect } from 'react';
import { db, enterPollVote } from '../services/firebase';

// Components
import SentimentButton from './SentimentButton';
import BarChart2 from './BarChart2';
import { Radio } from 'antd';

function Poll({ roomId }) {

  // const collectionName = 'poll';
  const pollOptions = ['😳', '😕', '🙂', '😁']
  const defaultOption = pollOptions[2];
  const [data, setData] = useState([]);
  const [active, setActive] = useState(defaultOption);

  // when user leaves, decrement the prev selection
  window.onbeforeunload = function () {
    enterPollVote(roomId, active, false);
  }

  useEffect(() => {
    // When user signs on, increment the default selection
    enterPollVote(roomId, defaultOption, true);

    // Listen for changes in votes and push to all clients
    const unsubscribe = db.collection('rooms')
      .doc(roomId)
      .collection('poll')
      .onSnapshot(function (snapshot) {
        var result = [];
        snapshot.forEach(function (doc) {
          result.push({ name: doc.id, count: doc.data().count });
        });
        setData(result);
      });
    return unsubscribe;
  }, [defaultOption]);

  function onChange(e) {
    enterPollVote(roomId, e.target.value, true); // add new vote
    enterPollVote(roomId, active, false); // remove previous vote
    setActive(e.target.value);
  }

  const buttons = pollOptions.map((option) => <SentimentButton text={option} color={option === active ? '#007bff' : '#f0f0f0'} />)

  return (
    <>
      <BarChart2 data={data} labels={pollOptions} color={'#007bff'} />
      <Radio.Group onChange={onChange} defaultValue={defaultOption} size='medium' style={{ width: '100%'}}>
        {buttons}
      </Radio.Group> 
    </>
  )
}

export default Poll;