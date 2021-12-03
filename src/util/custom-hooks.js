import { useReducer, useEffect } from 'react';

import withFirebaseAuth from 'react-with-firebase-auth'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, FirebaseUser } from "firebase/auth";
import { addDoc, getDocs, collection, setDoc, doc } from "firebase/firestore"; 


import firebaseConfig from '../firebaseConfig';


const firebaseApp = firebase.initializeApp(firebaseConfig);
let favoriteState = [];



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

async function getDoc(userId) {
  const snapshot = await db.collection('Favorite Lists').doc(userId).get();
  const data = snapshot.data();
  return data;
}
function usePersistedReducer(reducer, initialState) {
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user.email;
  const temp = "userId";

  
  const [state, dispatch] = useReducer(reducer, initialState, initial => {

    const tempStore = getDoc(userId);
    console.log(tempStore);

    const persisted = db.collection("Favorite Lists").doc(userId).data;
    
    console.log(persisted);
    return persisted ? JSON.parse(persisted) : initial;
    
  });
 
  console.log(JSON.stringify(state));
   if(favoriteState !== "[]" ){
    const docRef =  setDoc(doc(db, "Favorite Lists", userId), {
      
      userId: JSON.stringify(state)
      
    });
  }
    favoriteState = state;
  
  


  

  return [state, dispatch];
}

export function useShows() {
  return usePersistedReducer(showsReducer, favoriteState);
}
