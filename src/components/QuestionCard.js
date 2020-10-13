import React, { useState, useEffect } from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import Avatars from '../images';
import moment from 'moment';
import { LikeOutlined, LikeFilled } from '@ant-design/icons';
import { db, firebase, increment, decrement } from '../services/firebase';

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const QuestionCard = ({ questionId, onResolve }) => {
  const [likes, setLikes] = useState();
  const [liked, setLiked] = useState(false);
  const avatar = Avatars[randomInteger(0, 50)]; // Store avatar this in Questions.js
  const [user, setUser] = useState();
  const [text, setText] = useState();
  const [date, setDate] = useState();

  // helper for date processing
  function toDateTime(secs) {
    var t = new Date(Date.UTC(1970, 0, 1)); // Epoch
    t.setUTCSeconds(secs);
    return t;
  }

  function timeAgo(dateObj) {
    let dateArr = [];

    dateArr.push(dateObj.getFullYear());
    dateArr.push(dateObj.getMonth());
    dateArr.push(dateObj.getDate());
    dateArr.push(dateObj.getHours());
    dateArr.push(dateObj.getMinutes());
    dateArr.push(dateObj.getSeconds());

    console.log(dateArr);
    return moment(dateArr).fromNow();
  }

  useEffect(() => {
    if (!db.collection('questions')) return;

    // Initialize question data
    const docRef = db.collection('questions').doc(questionId);
    docRef.get().then(function (doc) {
      setLikes(doc.data().likes);
      setUser(doc.data().user);
      setText(doc.data().question);

      const dateObj = new Date(toDateTime(doc.data().created.seconds));
      setDate(timeAgo(dateObj));
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

    // Listen for changes in votes and push to all clients
    const unsubscribe = db.collection('questions').doc(questionId)
      .onSnapshot(function (doc) {
        setLikes(doc.data().likes);
        let dateObj = new Date(toDateTime(doc.data().created.seconds));
        setDate(timeAgo(dateObj));
      });
    return unsubscribe;
  }, [questionId]);

  const like = () => {
    if (liked) {
      let target = db.collection('questions').doc(questionId);
      target.update({ likes: decrement });
    } else {
      let target = db.collection('questions').doc(questionId);
      target.update({ likes: increment });
    }
    setLiked(!liked);
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {!liked ? <LikeOutlined /> : <LikeFilled />}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,

    <Tooltip key="comment-basic-resolve" title="Remove question">
      <span onClick={onResolve} key="comment-basic-resolve-">Resolve</span>
    </Tooltip>
  ];

  return (
    <>
      <Comment
        actions={actions}
        author={<a href='/'>{user}</a>}
        avatar={
          <Avatar
            src={avatar}
            alt="Avatar icon"
          />
        }
        content={
          // <h5>{text}</h5>
          <p style={{ fontSize: 14, fontWeight: 'bold' }}>{text}</p>
        }
        datetime={
          <span>{date}</span>
        }
      />
    </>
  );
};

export default QuestionCard;