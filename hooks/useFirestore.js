import { useState, useEffect } from "react";
import { firebase } from "../libs/firebase";

import config from "../config";
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
let db;
try {
  db = firebase.firestore();
} catch (e) {
  // Do nothing
}

export function createRoom(id, data) {
  if (!config.firebase.enabled) return;
  return db
    .collection("rooms")
    .doc(id)
    .set({
      created: firebase.firestore.FieldValue.serverTimestamp(),
      lastPing: firebase.firestore.FieldValue.serverTimestamp(),
      users: 1,
      ...data,
    });
}

export function createIdea(id, data, userId) {
  if (!config.firebase.enabled) return;

  return db.doc(`users/${userId}/ideas/${id}`).set({
    created: firebase.firestore.FieldValue.serverTimestamp(),
    ...data,
  });
}

export function updateRoom(id, data) {
  if (!config.firebase.enabled) return;
  return db
    .collection("rooms")
    .doc(id)
    .update({
      ...data,
    });
}

export function deleteIdea(id, userId) {
  if (!config.firebase.enabled) return;
  return db.doc(`users/${userId}/ideas/${id}`).delete();
}

export function useFirestoreRooms() {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  if (!config.firebase.enabled) return [rooms];

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = db
      .collection("rooms")
      .orderBy("lastPing", "desc")
      .onSnapshot((snapshot) => {
        setRooms(snapshot.docs.map((doc) => doc.data()));
        setIsLoading(false);
      });

    return unsubscribe;
  }, []);

  return [rooms, isLoading];
}

export function useFirestoreIdeas() {
  const [ideas, setIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  if (!config.firebase.enabled) return;

  useEffect(() => {
    setIsLoading(true);
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) return setIsLoading(false);

      const userId = user.uid;
      const unsubscribe = db
        .collection(`users/${userId}/ideas`)
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setIdeas(snapshot.docs.map((doc) => doc.data()));
          setIsLoading(false);
        });
      return unsubscribe;
    });
  }, []);

  return [ideas, isLoading];
}
