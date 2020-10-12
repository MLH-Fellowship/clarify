import React, { useState, useEffect } from 'react';
import { db } from "../services/firebase";

import SentimentButton from './SentimentButton';
import BarChart2 from './BarChart2';

function Poll(props) {
  const [data, setData] = useState([]);

  // TODO: e.target.name only works when clicking on upper left hand corner of MUI button
  const onClick = async (e) => {
    // Get current value
    let currData = data.filter(function (option) {
      return option.name === e.target.name
    })[0].count;

    // update db with new value
    db.collection('poll').doc(e.target.name).set({
      count: currData + 1
    })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  }

  // TODO: customize button order
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
  const buttons = pollOptions.map((option) => <SentimentButton text={option} onClick={onClick} />)

  return (
    <>
      {/* <BarChart data={data} /> */}
      <BarChart2 data={data} labels={pollOptions} />
      {buttons}
    </>
  )
}

export default Poll;