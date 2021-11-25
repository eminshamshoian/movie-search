/* eslint-disable */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Favs from './pages/Favs';
import Home from './pages/Home';

function App() {
  return (
    <div>
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
  );
}

export default App;
