import React, { Component } from 'react';
import { connect } from 'react-redux';

import redirect from './../../services/redirect';

import Nav from './../Nav/Nav';
import GroupForm from './GroupForm';

class Edit extends Component {
  render(){
    // if (this.props.redirect) {
    //   redirect.mainRedirect(this.props.history.push, this.props.user);
    // }
    console.log(this.props.match.params);
    return(
      <div>
        <Nav />
        <GroupForm title='Edit' button='Save' />
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
export default connect(mapStateToProps)(Edit);