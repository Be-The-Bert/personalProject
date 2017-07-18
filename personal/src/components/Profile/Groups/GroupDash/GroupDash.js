import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Media from './../../Media/Media';
import DailyPages from './../../DailyPages/DailyPages';
import Sections from './Sections/Sections';

export default class GroupDash extends Component {
  render(){
    return(
      <div>
        GroupDash
          <Switch>
            <Route component={Media} path='/groups/:groupname/media' />
            <Route component={DailyPages} path='/groups/:gro upname/pages' />
            <Route component={Sections} path='/groups/:groupname/sections' />
          </Switch>
      </div>
    )
  }
}