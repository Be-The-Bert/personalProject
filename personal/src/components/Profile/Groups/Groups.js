import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import CreateGroup from './CreateGroup/CreateGroup';
import GroupDetails from './GroupDetails/GroupDetails';
import GroupDash from './GroupDash/GroupDash';

export default class Groups extends Component {
  render(){
    return(
      <div>
        Groups
          <Switch>
            <Route component={CreateGroup} path='/groups/create' />
            <Route component={GroupDetails} path='/groups/details/:groupname' />
            <Route component={GroupDash} path='/groups/:groupname' />
          </Switch>
      </div>
    )
  }
}