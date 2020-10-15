import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCXZ3IgNwq1vczQYOoL_c0cph91RXxnKTw',
  authDomain: 'testing-500d7.firebaseapp.com',
  databaseURL: 'https://testing-500d7.firebaseio.com',
  projectId: 'testing-500d7',
  storageBucket: 'testing-500d7.appspot.com',
  messagingSenderId: '583234649390',
  appId: '1:583234649390:web:ecfdc4fc6ee257162b8ebf',
  measurementId: 'G-X522CEBVVE'
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const increment = firebase.firestore.FieldValue.increment(1);
const decrement = firebase.firestore.FieldValue.increment(-1);

const createRoom = (roomId, success) => {
  const pollOptions = ['😳', '😕', '🙂', '😁'];

  db.collection('rooms')
    .doc(roomId)
    .set({ roomName: 'My Room Name' })
    .then(function () {
      if (success) {
        success();
      }
    });

  // Add a new poll collection initialized the options and count: 0
  pollOptions.map((pollOption) =>
    db.collection('rooms')
      .doc(roomId)
      .collection('poll')
      .doc(pollOption)
      .set({ count: 0 }));
}

////////////////// Core actions

const enterPollVote = (roomId, option, action) => {
  // action: {true, false} for increase and decrease
  const docRef = db.collection('rooms')
    .doc(roomId)
    .collection('poll')
    .doc(option);
  action ? docRef.update({ count: increment }) : docRef.update({ count: decrement });
}

const likeQuestion = (roomId, questionId, action) => {
  // action: {true, false} for like and unlike
  const docRef = db.collection('rooms')
    .doc(roomId)
    .collection('questions')
    .doc(questionId);
  action ? docRef.update({ likes: increment }) : docRef.update({ likes: decrement })
}

// Get questions sorted descending by likes, ascending by time
const getQuestions = (roomId) => {
  let questions = [];
  db.collection('rooms')
    .doc(roomId)
    .collection('questions')
    .get()
    .then(function (querySnapshot) {
      questions = querySnapshot.docs.map(function (doc) { return { ...doc.data(), id: doc.id } });
      questions.sort((a, b) => { return b.likes - a.likes || a.created.seconds - b.created.seconds });
    })
    .catch(function (error) {
      console.error('Error getting questions:', error);
    });
  return questions;
}

// Get questions sorted descending by likes, ascending by time
const getQuestionsSnapshot = (roomId) => {
  let questions = [];
  db.collection('rooms')
    .doc(roomId)
    .collection('questions')
    .onSnapshot(querySnapshot => {
      questions = querySnapshot.docs.map(function (doc) { return { ...doc.data(), id: doc.id } });
      questions.sort((a, b) => { return b.likes - a.likes || a.created.seconds - b.created.seconds });
    }, function (error) {
      console.log('Error getting questions', error);
    });
}

// Add question with success feedback
const addQuestion = (roomId, data, success) => {
  db.collection('rooms').doc(roomId)
    .collection('questions')
    .add(data)
    .then(() => {
      success();
    })
    .catch(error => {
      console.log('Error adding question', error);
    });
}

// Delete question with success feedback
const resolveQuestion = (roomId, questionId) => {
  db.collection('rooms').doc(roomId)
    .collection('questions')
    .doc(questionId)
    .delete()
    .then(() => {
      console.log(questionId, 'successfully resolved');
    })
    .catch(function (error) {
      console.error('Error removing question: ', error);
    });
}

////////////////// Core actions

const voteCountGreaterThanZero = (roomId, option) => {
  const prev = db.collection('rooms')
    .doc(roomId)
    .collection('poll')
    .doc(option)
    .count;
  console.log(prev);
  return prev > 0 ? true : false;
}

export {
  db,
  auth,
  increment,
  decrement,
  firebase,
  getQuestionsSnapshot,
  addQuestion,
  getQuestions,
  resolveQuestion,
  likeQuestion,
  enterPollVote,
  createRoom,
  voteCountGreaterThanZero
};
