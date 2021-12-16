/* eslint-disable */

// Main app entry point
import React, { Component } from 'react';

// Bring switch and route for navigation
import { Switch, Route } from 'react-router-dom';

// Import firebase
import withFirebaseAuth from 'react-with-firebase-auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';

// Import pages
import Favs from './pages/Favs';
import Home from './pages/Home';

// Import css file
import './App.css';

const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends Component {
  render() {
    const {
      user,
      signOut,

      signInWithGoogle,
    } = this.props;
    // Check and see if its a user present the user login info and output sign in if not
    // FULLY managed by firebase
    // We dont keep track of any info and do not have our backend
    // Cloud based auth system and storage
    return (
      <div className="App">
        <div>
          <header className="App-header">
            {user ? <p>Hello, {user.displayName}</p> : <p>Please sign in.</p>}

            {user ? (
              <button className="button" onClick={signOut}>
                Sign out
              </button>
            ) : (
              <button className="button" onClick={signInWithGoogle}>
                Sign in with Google
              </button>
            )}
          </header>

          {/* Map thru the pages and present appropriate components */}
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
