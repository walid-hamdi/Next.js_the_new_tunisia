import { useState, useEffect } from "react";
import firebase from "../libs/firebase";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

// Inside AuthProvider
// const provider = new GoogleAuthProvider();

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
  name: user.displayName,
  photoUrl: user.photoURL,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  const provider = new GoogleAuthProvider();

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    var formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(false);
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  const signOut = () => firebase.auth().signOut().then(clear);

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInWithGoogle,
    signOut,
  };
}
