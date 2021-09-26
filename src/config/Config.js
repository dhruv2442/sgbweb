import { initializeApp } from 'firebase/app';
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";

  const firebaseConfig = {
    apiKey: "AIzaSyBnb-bdY1AwiAAyzy41rjjHGoVjElNOnHk",
    authDomain: "sgbweb-c7983.firebaseapp.com",
    projectId: "sgbweb-c7983",
    storageBucket: "sgbweb-c7983.appspot.com",
    messagingSenderId: "903660577713",
    appId: "1:903660577713:web:3f3aea39964d8548759390"
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const fs = getFirestore(app);
const storage = getStorage(app);

export {auth,fs,storage};