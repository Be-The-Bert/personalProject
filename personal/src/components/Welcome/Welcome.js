import React, { Component } from 'react';
import { connect } from 'react-redux';

import redirect from './../../services/redirect';

class Welcome extends Component {
  render(){
    if (this.props.redirect) {
      redirect.welcomeRedirect(this.props.history.push, this.props.user);
    }
    return(
      <div>
        Welcome
        <a href='http://localhost:4000/auth0'>Login</a>
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