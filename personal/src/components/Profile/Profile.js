import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import redirect from './../../services/redirect';

import Media from './../Media/Media';
import DailyPages from './../DailyPages/DailyPages';
import Groups from './Groups/Groups';

import './Profile.css';

class Profile extends Component {
  render(){
    if (this.props.redirect) {
      redirect.mainRedirect(this.props.history.push, //this.props.user// 
      true);
    }
    return(
      <div id='Profile'>
        <div className='dashboard'>
          <div className='bluestripe'>
          </div>
          <div className='whitestripe'>
          </div>
          <div className='bigpic'>
            {/* <img src={this.props.userInfo.profilepic}></img> */}
          </div>
        </div>
        <Link to='/profile/media'>click</Link>
          <Switch>
            <Route component={Media} path='/profile/media' />
            <Route component={DailyPages} path='/profile/pages' />
            <Route component={Groups} path='/profile/groups' />
          </Switch>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    user: state.user,
    redirect: state.redirect,
    userInfo: state.userInfo
  }
}
export default connect(mapStateToProps)(Profile);