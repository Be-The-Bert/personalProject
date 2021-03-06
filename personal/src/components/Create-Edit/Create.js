import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import redirect from './../../services/redirect';

import GroupForm from './GroupForm';

class Create extends Component {
  createRequests(groupname, members, sections){
    let groupid;
    let sectionid;
    axios.post('/api/creategroup', {name: groupname})
    .then(res => {
      groupid = res.data[0].id;
      members.forEach(member => {
        axios.post('/api/addmember', {groupid, userid: member.id, admin: member.admin})
      })
      sections.forEach(section => {
        axios.post('/api/addsection', {groupid, name: section.name})
        .then(res => {
          sectionid = res.data[0].id;
          section.days.forEach(day => {
            axios.post('/api/addday', {sectionid, date: day})
          })
        })
      })
    })
  }
  render(){
    if (this.props.redirect) {
      redirect.mainRedirect(this.props.history.push, this.props.user);
    }
    return(
      <div className='CreateEdit'>
        <GroupForm title='Create' button='Create' callback={this.createRequests}/> 
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
export default connect(mapStateToProps)(Create);