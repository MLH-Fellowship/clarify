import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBdyAmQjUPwUswHQidFoM85y3LJjp3dkpg",
    authDomain: "double-check-3cdcc.firebaseapp.com",
    databaseURL: "https://double-check-3cdcc.firebaseio.com"
  };
  firebase.initializeApp(config);
  export const auth = firebase.auth;
  export const db = firebase.database();