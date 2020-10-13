import React, { useState, useEffect } from 'react';
import { db, increment, decrement } from "../services/firebase";

// Components
import SentimentButton from './SentimentButton';
import BarChart2 from './BarChart2';
import { Radio } from 'antd';

function Poll(props) {
  const [data, setData] = useState([]);
  const [active, setActive] = useState('🙂');

  // when user leaves, decrement the prev selection
  window.onbeforeunload = function () {
    const prev = db.collection('poll').doc(active);
    prev.update({ count: decrement });
  }

  // When user signs on, increment the default selection
  useEffect(() => {
    const target = db.collection('poll').doc(active);
    target.update({ count: increment });
    console.log('increment');
  }, []);

  // Update data when db collection is modified 
  useEffect(() => {
    if (!db.collection('poll')) return;
    const unsubscribe = db.collection('poll').onSnapshot(function (snapshot) {
      var result = [];
      snapshot.forEach(function (doc) {
        result.push({ name: doc.id, count: doc.data().count });
      });
      setData(result);
    });
    return unsubscribe;
  }, []);

  // Buttons
  const pollOptions = [
    '😳', '😕', '🙂', '😁'
  ]

  function onChange(e) {
    // increment selection
    const target = db.collection('poll').doc(e.target.value);
    target.update({ count: increment });

    // decrement previous selection
    const prev = db.collection('poll').doc(active);
    prev.update({ count: decrement });
    setActive(e.target.value);
  }

  const buttons = pollOptions.map((option) => <SentimentButton text={option} color={option === active ? '#2190e0' : '#f0f0f0'} />)

  return (
    <>
      <BarChart2 data={data} labels={pollOptions} />
      <Radio.Group onChange={onChange} defaultValue='🙂' size="medium" style={{ margin: 30 }}>
        {buttons}
      </Radio.Group>
    </>
  )
}

export default Poll;