import React, { Component } from 'react';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import redirect from './../../services/redirect';

import Media from './../Media/Media';
import DailyPages from './../DailyPages/DailyPages';
import Sections from './Sections/Sections';

class GroupDash extends Component {
  render(){
    let group = [''];
    if (this.props.groups.length) {
      group = this.props.groups.filter(group => {
        return group.groupid == this.props.match.params.groupid
      })
    }
  
    if (this.props.history.location.pathname === `/dashboard/${this.props.match.params.groupid}`) {
      this.props.history.push(`/dashboard/${this.props.match.params.groupid}/media`)
    };
    let sections = this.props.sections.filter(section => {
      return section.groupid == this.props.match.params.groupid
    })
    if (this.props.history.location.pathname === `/dashboard/${this.props.match.params.groupid}/sections`) {
      this.props.history.push(`/dashboard/${this.props.match.params.groupid}/sections/${sections[0].id}`)
    };
    return(
      <div id='GroupDash'>
        <div className='switchbucket'>
          <Switch>
            <Route path='/dashboard/:groupid/media' render={() => {
              return <div>
                <div className='blueBox'><h1>{group[0].name} - Media</h1></div>
                <Media />
              </div>
            }}/>
            <Route path='/dashboard/:groupid/pages' render={() => {
              return <div>
                <div className='blueBox'><h1>{group[0].name} - Pages</h1></div>
                <DailyPages />
              </div>
            }}/>
            <Route path='/dashboard/:groupid/sections/:sectionid' render={() => {
              return <div>
                <div className='blueBox'><h1>{group[0].name} - Sections</h1></div>
                <Sections/>
              </div>
            }}/>
          </Switch>
        </div> 
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    user: state.user,
    redirect: state.redirect,
    groups: state.groups,
    sections: state.sections
  }
}
export default withRouter(connect(mapStateToProps)(GroupDash));