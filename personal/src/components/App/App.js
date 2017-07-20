import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { checkUser } from './../../ducks/actions';

import Nav from './../Nav/Nav';
import Welcome from './../Welcome/Welcome';
import Profile from './../Profile/Profile';
import DayView from './../DayView/DayView';
import CreateGroup from './../CreateGroup/CreateGroup';
import GroupDetails from './../GroupDetails/GroupDetails';
import EditGroup from './../EditGroup/EditGroup';
import GroupDash from './../GroupDash/GroupDash';

class App extends Component {
  componentDidMount(){
    this.props.checkUser();
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
    user: state.user
  }
}
export default withRouter(connect(mapStateToProps, { checkUser })(App));

            // <Switch>
              
            //   {this.props.user
            //   ?
            //     <div>
            //     <Route component={Profile} path='/profile'/>
            //     <Route component={DayView} path='/pages/:dayid' />
            //     <Route component={CreateGroup} path='/groups/create' />
            //     <Route component={GroupDetails} path='/groups/details/:groupname' exact/>
            //     <Route component={EditGroup} path='/groups/details/:groupname/edit' />
            //     <Route component={GroupDash} path='/groupdashboard/:groupname' />
            //     <Route render={() => <Redirect to="/profile"/>}/>
            //     </div>
            //   :
            //     <div>
            //     <Route component={Welcome} path='/welcome' />
            //     <Route render={() => <Redirect to="/welcome"/>}/>
            //     </div>
            //   }
            // </Switch>
