import firebase from 'firebase-admin';

const config = require('../../firebase-config.json');

export const firebaseInit = () => {
  if (firebase.apps.length == 0) {
    firebase.initializeApp({
      credential: firebase.credential.cert(config),
    });
  }
};
