import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import Nav from './Nav/Nav';
import Media from './Media/Media';
import DailyPages from './DailyPages/DailyPages';
import Groups from './Groups/Groups';

export default class Profile extends Component {
  render(){
    return(
      <div>
        Profile
        <Nav />
        <Link to='/groups/grofdsupname/sections/sectionfdsfdsfname'> Go to that thing </Link>
          <Switch>
            <Route component={Media} path='/media' />
            <Route component={DailyPages} path='/pages' />
            <Route component={Groups} path='/groups' />
          </Switch>
      </div>
    )
  }
}