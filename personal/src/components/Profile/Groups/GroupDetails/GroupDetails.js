import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import EditGroup from './../EditGroup/EditGroup';

export default class GroupDetails extends Component {
  render(){
    return(
      <div>
        GroupDetails
        <Route component={EditGroup} path='/groups/details/:groupname/edit' />
      </div>
    )
  }
}