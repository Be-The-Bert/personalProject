import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import './Nav.css';

class Nav extends Component {
  render(){
    let name = [];
    if (this.props.userInfo.name){
      name = this.props.userInfo.name.split(' ');
    }
    return(
      <div id='Nav'>
        <Link to='/dashboard/media' className='link'>Dashboard</Link>
        <div className='block'>
          <h3 className='border'>Hello, {name[0]}</h3>
          <a href='http://localhost:4000/auth0/logout' className='logout'>Logout</a>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    userInfo: state.userInfo
  }
}
export default withRouter(connect(mapStateToProps)(Nav));