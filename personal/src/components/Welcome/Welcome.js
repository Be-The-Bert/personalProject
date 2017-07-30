import React, { Component } from 'react';
import { connect } from 'react-redux';

import redirect from './../../services/redirect';

import './Welcome.css';

class Welcome extends Component {
  render(){
    if (this.props.redirect) {
      redirect.welcomeRedirect(this.props.history.push, this.props.user);
    }
    return(
      <div id='Welcome'>
        <div className='navbar'>
          <a href='http://localhost:4000/auth0'>Sign in / Sign up</a>
        </div>
        <div className='title'>
          <h2>Welcome To</h2>
          <h1>Class Baskets</h1>
          <h3>Classroom Resource Manager</h3>
        </div>
        <div className='quotesLine'>
          <div className='line'></div>
          <p>"</p>
          <div className='line'></div>
        </div>
        <div className='descriptionBlock'>
          <p>Class Baskets keep your resources together and associated with the day of class that you shared them. Sort them by topic later for quick access.</p>
          <br />
          <p>Never lose a link again.</p>
        </div>
        <div className='quotesLine'>
          <div className='line'></div>
          <p>"</p>
          <div className='line'></div>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    user: state.user,
    redirect: state.redirect
  }
}
export default connect(mapStateToProps)(Welcome);