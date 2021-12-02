/* eslint-disable */
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import withFirebaseAuth from 'react-with-firebase-auth'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import Favs from './pages/Favs';
import Home from './pages/Home';

import './App.css';

const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends Component {
  render() {
    const {
      user,
      signOut,
      
      signInWithGoogle,
    } = this.props;

    return (
      <div className="App">
         <div>
         <header className="App-header">
          
          {
            user
              ? <p>Hello, {user.displayName}</p>
              : <p>Please sign in.</p>
          }

          {
            user
              ? <button onClick={signOut}>Sign out</button>
              : <button onClick={signInWithGoogle}>Sign in with Google</button>
          }
        </header>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/favs">
          <Favs />
        </Route>
        <Route>
          <div>Not Founds</div>
        </Route>
      </Switch>
    </div>
       
      </div>
    );
  }
}


const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
