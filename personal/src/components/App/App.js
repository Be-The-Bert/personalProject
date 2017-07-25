import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { checkUser, getUserInfo } from './../../ducks/actions';

import Welcome from './../Welcome/Welcome';
import Dashboard from './../Dashboard/Dashboard';
import DayView from './../DayView/DayView';
import Create from './../Create-Edit/Create';
import Details from './../Details/Details';
import Edit from './../Create-Edit/Edit';

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
            <Switch>
              <Route component={Welcome} path='/welcome' /> 
              <Route component={Dashboard} path='/dashboard' />
              <Route component={Create} path='/create' />
              <Route component={Details} path='/details/:groupid' exact />
              <Route component={Edit} path='/details/:groupid/edit' />
              <Route component={DayView} path='/pages/:dayid' />
            </Switch>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user
  }
}
export default withRouter(connect(mapStateToProps, { checkUser, getUserInfo })(App));