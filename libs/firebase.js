import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import config from "../config";

const {
  firebase: { enabled, apiKey, authDomain, projectId },
} = config;

const clientCredentials = {
  apiKey,
  authDomain,
  projectId,
};

let firebaseApp;
let analytics;

if (firebase.apps.length) {
  firebaseApp = firebase.apps[0];
} else {
  if (enabled) {
    firebaseApp = firebase.initializeApp(clientCredentials);
  }
}

// auth start
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
// auth end

export default firebaseApp;

export { firebaseApp, firebase, analytics, clientCredentials };
