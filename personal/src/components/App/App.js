import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { checkUser, getUserInfo } from './../../ducks/actions';

import Nav from './../Nav/Nav';
import Welcome from './../Welcome/Welcome';
import Profile from './../Profile/Profile';
import DayView from './../DayView/DayView';
import CreateGroup from './../CreateGroup/CreateGroup';
import GroupDetails from './../GroupDetails/GroupDetails';
import EditGroup from './../EditGroup/EditGroup';
import GroupDash from './../GroupDash/GroupDash';

import './../../reset.css';

class App extends Component {
  componentDidMount(){
    this.props.checkUser();
    this.props.getUserInfo();
    if (this.props.history.location.pathname === '/') {
      this.props.history.push('/welcome');
    }
  }
  render() {
    return (
      <div className="App">
          {this.props.user 
          ?
            <Nav />
          :
            null
          }
            <Switch>
              <Route component={Welcome} path='/welcome' />
              <Route component={Profile} path='/profile'/>
              <Route component={DayView} path='/pages/:dayid' />
              <Route component={CreateGroup} path='/groups/create' />
              <Route component={GroupDetails} path='/groups/details/:groupname' exact/>
              <Route component={EditGroup} path='/groups/details/:groupname/edit' />
              <Route component={GroupDash} path='/groupdashboard/:groupname' />
            </Switch>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user,
    userInfo: state.userInfo
  }
}
export default withRouter(connect(mapStateToProps, { checkUser, getUserInfo })(App));