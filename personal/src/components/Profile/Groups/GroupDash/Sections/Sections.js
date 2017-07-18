import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import SectionView from './SectionView';

export default class Sections extends Component {
  render(){
    return(
      <div>
        Sections
          <Route component={SectionView} path='/groups/:groupname/sections/:sectionname' />
      </div>
    )
  }
}