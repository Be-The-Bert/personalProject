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
    const bigpicStyle = {
      "background-image": `url(${this.props.userInfo.profilepic})`
    }
    return(
      <div id='Profile'>
        <div className='dashboard'>
          <div className='bluestripe'>
            <h1>{this.props.userInfo.name}</h1>
          </div>
          <div className='whitestripe'>
            <Link className='links' to='/profile/media'>Media</Link>
            <Link className='links' to='/profile/pages'>Daily Pages</Link>
            <Link className='links' to='/profile/groups'>Groups</Link>
          </div>
          <div className='bigpic' style={bigpicStyle}></div>
        </div>
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