import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import './Nav.css';

class Nav extends Component {
  constructor(){
    super();
    this.logout = this.logout.bind();
  }
  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    this.props.history.replace('/welcome');
  }
  render(){
    let temp;
    if (this.props.userInfo){
      temp = this.props.userInfo.name.split(' ');
    }
    return(
      <div id='Nav'>
        <Link to='/profile/media' className='link'>Home</Link>
        <div className='block'>
          <h3 className='border'>Hello, {temp[0]}</h3>
          <h3 className='logout' onClick={this.logout}>Logout</h3>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    user: state.user,
    userInfo: state.userInfo
  }
}
export default withRouter(connect(mapStateToProps)(Nav));