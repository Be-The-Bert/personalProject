import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import DayView from './DayView/DayView';

export default class DailyPages extends Component {
  render(){
    return(
      <div>
        DailyPages
          <Route component={DayView} path='/pages/:dayid' />
      </div>
    )
  }
}