import firebase from "firebase/app";

// Initialize Firebase App
import { firebaseConfig } from './firebaseConfig';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
