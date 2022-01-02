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
    // console.log("Sign in");
    signInWithPopup(auth, provider)
      .then((result) => {
        // // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential?.accessToken;
        // // The signed-in user info.
        // const user = result.user;
        // console.log({ credential, token, user });
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // console.log({ errorCode, errorMessage, email, credential });
      });
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
