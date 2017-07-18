import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Profile from './../Profile/Profile';
import Welcome from './../Welcome/Welcome';

class App extends Component {
  constructor(){
    super();
    this.state = {
      loggedin: true
    }
  }
  render() {
    return (
      <div className="App">
        I'm an app
          <Switch>
            <Route component={Welcome} path='/welcome' />
            <Route component={Profile} path='/:username' />
          </Switch>
      </div>
    );
  }
}

export default App;
