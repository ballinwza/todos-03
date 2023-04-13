// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRhp6q0KI83BUmnhFfO4gyeXdj7w7MwLw",
  authDomain: "todo-list-tr.firebaseapp.com",
  databaseURL: "https://todo-list-tr-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todo-list-tr",
  storageBucket: "todo-list-tr.appspot.com",
  messagingSenderId: "643510137715",
  appId: "1:643510137715:web:baf9809c72e63ae27e8b06",
  measurementId: "G-1X77S44Z7G"
};

// Initialize Firebase
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
// const analytics = getAnalytics(app);
export const db = getDatabase(app)
export type dbType = typeof db
export const path = 'todoList'