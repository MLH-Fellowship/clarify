import React, { useState, useEffect } from 'react';
import { db, increment, decrement } from '../services/firebase';

// Components
import SentimentButton from './SentimentButton';
import BarChart2 from './BarChart2';
import { Radio } from 'antd';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useParams } from "react-router";

var collectionName = "poll";

function Collection() {
  let { id } = useParams();
  collectionName = id;
  return " ";
}

function Poll(props) {
  const pollOptions = ['😳', '😕', '🙂', '😁']
  const defaultOption = pollOptions[2];
  const [data, setData] = useState([]);
  const [active, setActive] = useState(defaultOption);

  // when user leaves, decrement the prev selection
  window.onbeforeunload = function () {
    const prev = db.collection(collectionName).doc(active);
    prev.update({ count: decrement });
  }

  useEffect(() => {
    if (!db.collection(collectionName)) return;

    // When user signs on, increment the default selection
    const target = db.collection(collectionName).doc(defaultOption);
    target.update({ count: increment });

    // Listen for changes in votes and push to all clients
    const unsubscribe = db.collection(collectionName).onSnapshot(function (snapshot) {
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
    const target = db.collection(collectionName).doc(e.target.value);
    target.update({ count: increment });

    // decrement previous selection
    const prev = db.collection(collectionName).doc(active);
    prev.update({ count: decrement });
    setActive(e.target.value);
  }

  const buttons = pollOptions.map((option) => <SentimentButton text={option} color={option === active ? '#007bff' : '#f0f0f0'} />)

  return (
    <>
      <BarChart2 data={data} labels={pollOptions} color={'#007bff'} />
      <Radio.Group onChange={onChange} defaultValue={defaultOption} size='medium' style={{ margin: 30 }}>
        {buttons}
      </Radio.Group>
      {/*<Route path="/:id">
          <Collection />
  </Route> */}
    </>
  )
}

export default Poll;