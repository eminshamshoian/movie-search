import { useReducer, useEffect } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/auth';
import { addDoc, getDocs, collection } from "firebase/firestore"; 

import firebaseConfig from '../firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true }); 

function showsReducer(prevState, action) {
  switch (action.type) {
    case 'ADD': {
      return [...prevState, action.showId];
    }

    case 'REMOVE': {
      return prevState.filter(showId => showId !== action.showId);
    }

    default:
      return prevState;
  }
}

function usePersistedReducer(reducer, initialState, key) {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const persisted = localStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : initial;
  });
 
  
    const docRef =  addDoc(collection(db, "Favorite Lists"), {
      userkey: JSON.stringify(state)
    });
    
  


  

  return [state, dispatch];
}

export function useShows(key = 'shows') {
  return usePersistedReducer(showsReducer, [], key);
}
