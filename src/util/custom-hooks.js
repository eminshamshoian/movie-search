import { useReducer, useEffect } from 'react';

import withFirebaseAuth from 'react-with-firebase-auth'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, FirebaseUser } from "firebase/auth";
import { addDoc, getDocs, collection, setDoc, doc } from "firebase/firestore"; 


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

function usePersistedReducer(reducer, initialState) {
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user.email;
  const docRefr = doc(db, "Favorite Lists", userId);
  const [state, dispatch] = useReducer(reducer, initialState, initial => {

    const persisted = db.collection("Favorite Lists").doc(userId).data;

    return persisted ? JSON.parse(persisted) : initial;
    
  });
 
    

    const docRef =  setDoc(doc(db, "Favorite Lists", userId), {
      
      userId: JSON.stringify(state)
    });
    
  


  

  return [state, dispatch];
}

export function useShows() {
  return usePersistedReducer(showsReducer, []);
}
