import * as firebase from 'firebase';
import 'firebase/firestore';
import { message } from 'antd';

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


////////////////// App actions

const validateRoomKey = (e, props) => {
  // Room code entered
  let value = e.target.value;

  db.collection('rooms').get().then(function (querySnapshot) {
    let rooms = querySnapshot.docs.map((doc) => { return doc.id });
    if (!rooms.includes(value)) {
      message.error('Room code is invalid');
    }
    else {
      auth.signInAnonymously();
      message.success('Entered room');

      return props.history.push(`${value}`);
    }
  })
}

// Get room by id; returns undefined if id does not exist * Use async function with async/await *
const getRoom = async id => {
  const docRef = db.collection('rooms').doc(id);

  try {
    const doc = await docRef.get();
    return doc.data();
  }
  catch (err) {
    console.log('Error getting document:', err);
  }
};

// Add a new poll collection with options initialized and count: 0 * Use async function with async/await *
const createRoom = async (generate, success) => {

  // Generate unique ID
  var roomId = generate();

  // Regenerate id if room exists already
  while (await getRoom(roomId)) {
    console.log('Room key exists already. Regenerating...')
    roomId = generate();
  }

  const pollOptions = ['😳', '😕', '🙂', '😁'];

  return new Promise((resolve) => {


    db.collection('rooms')
      .doc(roomId)
      .set({ roomName: 'My Room' })
      .then(function () {
        success(roomId);
        resolve(roomId);
      });

    // Add a new poll collection initialized the options and count: 0
    pollOptions.map((pollOption) =>
      db.collection('rooms')
        .doc(roomId)
        .collection('poll')
        .doc(pollOption)
        .set({ count: 0 }));
  })
}

////////////////// Core actions

const enterPollVote = (roomId, option, action, prevOption) => {
  // action: {true, false} for increase and decrease
  const optionRef = db.collection('rooms')
    .doc(roomId)
    .collection('poll')
    .doc(option);

  // update vote count
  action ? optionRef.update({ count: increment }) : optionRef.update({ count: decrement });

  // if prevOption is provided, decrement it
  if (prevOption) {
    const prev = db.collection('rooms')
      .doc(roomId)
      .collection('poll')
      .doc(prevOption);
    prev.get().then(function (doc) {
      if (doc.data().count > 0) {
        prev.update({ count: decrement });
      }
    });
  }
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
const resolveQuestion = (roomId, questionId, success) => {
  db.collection('rooms').doc(roomId)
    .collection('questions')
    .doc(questionId)
    .delete()
    .then(() => {
      success();
    })
    .catch(function (error) {
      console.error('Error removing question: ', error);
    });
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
  validateRoomKey,
  getRoom
};
