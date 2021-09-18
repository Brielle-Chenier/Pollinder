import firebase from 'firebase/compat/app';
import 'firebase/firestore'
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyCwXK0LV81jgo3pdFHnPiAhz0KP9GY1ItI",
  authDomain: "pollinder-58fe2.firebaseapp.com",
  databaseURL: "https://pollinder-58fe2-default-rtdb.firebaseio.com",
  projectId: "pollinder-58fe2",
  storageBucket: "pollinder-58fe2.appspot.com",
  messagingSenderId: "110928727834",
  appId: "1:110928727834:web:7726de41fa8c77ffc0e6a3",
  measurementId: "G-9EWYS7BHSL"
};

  const app = firebase.initializeApp(firebaseConfig);
  const database = getDatabase();
  
  export default app;

