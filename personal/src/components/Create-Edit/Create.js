import React, { Component } from 'react';
import { connect } from 'react-redux';

import redirect from './../../services/redirect';

import Nav from './../Nav/Nav';
import GroupForm from './GroupForm';

import './CreateEdit.css';

class CreateGroup extends Component {
  render(){
    // if (this.props.redirect) {
    //   redirect.mainRedirect(this.props.history.push, this.props.user);
    // }
    return(
      <div className='CreateEdit'>
        <Nav />
        <h1>Create Group</h1>
         <GroupForm /> 
        <button className='createSaveButton'>Create</button>
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
export default connect(mapStateToProps)(CreateGroup);