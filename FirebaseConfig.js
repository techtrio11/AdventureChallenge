import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyA410rxffNkXZj_phTLEXVGkompWOZM-_E",
  authDomain: "adventurechallenge-5910c.firebaseapp.com",
  projectId: "adventurechallenge-5910c",
  storageBucket: "adventurechallenge-5910c.appspot.com",
  messagingSenderId: "439828671232",
  appId: "1:439828671232:web:ebde972f006be025e521e5",
};

initializeApp(firebaseConfig);
export const db = getFirestore();
export const challengesReference = collection(db, "Challenges");
export const usersReference = collection(db, "Users");
export const storage = getStorage();
