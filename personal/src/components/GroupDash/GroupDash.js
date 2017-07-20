import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Media from './../Media/Media';
import DailyPages from './../DailyPages/DailyPages';
import Sections from './Sections/Sections';

export default class GroupDash extends Component {
  render(){
    return(
      <div>
        GroupDash
          <Switch>
            <Route component={Media} path='/groupdashboard/:groupname/media' />
            <Route component={DailyPages} path='/groupdashboard/:groupname/pages' />
            <Route component={Sections} path='/groupdashboard/:groupname/sections' />
          </Switch>
      </div>
    )
  }
}