import React, { useState, useEffect } from 'react';
import { db, enterPollVote } from '../services/firebase';
import { useHistory, withRouter } from 'react-router-dom';

// Components
import SentimentButton from './SentimentButton';
import BarChart2 from './BarChart2';
import { Radio } from 'antd';

function Poll({ roomId, logoRef }) {

  // const collectionName = 'poll';
  const pollOptions = ['😳', '😕', '🙂', '😁'];
  const defaultOption = pollOptions[2];
  const [data, setData] = useState([]);
  const [active, setActive] = useState(defaultOption);

  let history = useHistory();

  // when user refreshes/closes/navigates away, decrement the prev selection
  window.onbeforeunload = function () {
    enterPollVote(roomId, active, false);
  }

  // when user navigates away from room using React router, decrement the prev selection
  useEffect(() => {
    return () => {
      if (history.action === 'POP') {
        enterPollVote(roomId, active, false);
      }
    };
  }, [history, active, roomId]);

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
  }, [defaultOption, roomId]);

  function onChange(e) {
    // let result = [];
    // for (let item of data) {
    //   if (item.name === e.target.value) {
    //     result.push({ 'name': item.name, 'count': item.count + 1 });
    //   }
    //   else if (item.name === active) {
    //     result.push({ 'name': item.name, 'count': item.count - 1 });
    //   }
    //   else {
    //     result.push(item);
    //   }
    // }
    // console.log(result);
    // setData(result);
    enterPollVote(roomId, e.target.value, true, active); // add new vote
    setActive(e.target.value);
  }

  const buttons = pollOptions.map((option) => <SentimentButton className='sentiment-button' text={option} color={option === active ? '#5285fb' : 'white'} />)

  return (
    <>

      <div className='poll' >
        <BarChart2 data={data} labels={pollOptions} color={'#5285fb'} />
        <Radio.Group onChange={onChange} defaultValue={defaultOption} size='large' style={{ width: '100%' }}>
          {buttons}
        </Radio.Group>
      </div>
    </>
  )
}

export default withRouter(Poll);