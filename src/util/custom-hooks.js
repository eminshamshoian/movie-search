// Custom hooks section where all the database magic happens
import { useReducer, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

// Initialize firebase
import firebaseConfig from '../firebaseConfig';
const firebaseApp = firebase.initializeApp(firebaseConfig);
let favoriteState = [];
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

// get document functionality
async function getDoc(userId) {
  let json;

  const snapshot = await db.collection('Favorite Lists').doc(userId).get();
  const data = snapshot.data();
  if (await snapshot.exists) {
    json = data.userId;
    favoriteState = JSON.parse(json);

    console.log(JSON.parse(json));
  }

  return json;
}

// Movie reduser to add or remove favs
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

// Firebase auth
function usePersistedReducer(reducer, initialState) {
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user.email;

  // presist storage information
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const tempStore = getDoc(userId);

    const persisted = db.collection('Favorite Lists').doc(userId).data;

    return persisted ? getDoc(userId) : initial;
  });

  console.log(favoriteState);
  if (JSON.stringify(state) !== '[]' && JSON.stringify(state).length > 0) {
    const docRef = setDoc(doc(db, 'Favorite Lists', userId), {
      userId: JSON.stringify(state),
    });
  }
  favoriteState = state;

  return [state, dispatch];
}

// export the useShows function with the useReucer show info as well as the favs state to be used throughout applicaiton
export function useShows(userId) {
  return usePersistedReducer(showsReducer, favoriteState);
}
