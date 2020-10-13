import React, { useState, useEffect } from 'react';
import { db, increment, decrement } from '../services/firebase';

// Components
import SentimentButton from './SentimentButton';
import BarChart2 from './BarChart2';
import { Radio } from 'antd';

function Poll(props) {
  const pollOptions = ['😳', '😕', '🙂', '😁']
  const defaultOption = pollOptions[2];
  const [data, setData] = useState([]);
  const [active, setActive] = useState(defaultOption);

  // when user leaves, decrement the prev selection
  window.onunload = function () {
    const prev = db.collection('poll').doc(active);
    prev.update({ count: decrement });
  }

  useEffect(() => {
    if (!db.collection('poll')) return;

    // When user signs on, increment the default selection
    const target = db.collection('poll').doc(defaultOption);
    target.update({ count: increment });

    // Listen for changes in votes and push to all clients
    const unsubscribe = db.collection('poll').onSnapshot(function (snapshot) {
      var result = [];
      snapshot.forEach(function (doc) {
        result.push({ name: doc.id, count: doc.data().count });
      });
      setData(result);
    });
    return unsubscribe;
  }, [defaultOption]);

  function onChange(e) {
    // increment selection
    const target = db.collection('poll').doc(e.target.value);
    target.update({ count: increment });

    // decrement previous selection
    const prev = db.collection('poll').doc(active);
    prev.get().then(function (doc) {
      if (doc.data().count > 0) {
        prev.update({ count: decrement });
      }
    });
    setActive(e.target.value);
  }

  const buttons = pollOptions.map((option) => <SentimentButton text={option} color={option === active ? '#007bff' : '#f0f0f0'} />)

  return (
    <>
      <BarChart2 data={data} labels={pollOptions} color={'#007bff'} />
      <Radio.Group onChange={onChange} defaultValue={defaultOption} size='medium' style={{ margin: 30 }}>
        {buttons}
      </Radio.Group>
    </>
  )
}

export default Poll;