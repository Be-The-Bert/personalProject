import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import redirect from './../../services/redirect';

import Nav from './../Nav/Nav';
import MediaBasket from './MediaBasket';

import './DayView.css';

class DayView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageInfo: {
        dayid: null,
        groupname: '',
        sectionname: '',
        date: '',
        groupid: null,
        sectionid: null
      }
    }
  }
  componentDidMount() {
    axios.get(`/api/page/${this.props.match.params.dayid}`)
    .then(res => {
      console.log('axios');
      this.setState(Object.assign({}, this.state, {pageInfo: res.data[0]}))
    })
    .catch(err => console.log(err));
  }
  render(){
    if (this.props.redirect) {
      redirect.mainRedirect(this.props.history.push, this.props.user);
    }
    return(
      <div id='DayView'>
        <Nav />
        <h1 className='header'>{this.state.pageInfo.groupname}</h1>
        <h2 className='subHeader'>{this.state.pageInfo.sectionname}</h2>
        <h2 className='subHeader'>{this.state.pageInfo.date}</h2>  
        <div className='notesBox'>
          <h2 className='subHeader'>Notes</h2>
          <textarea>notes</textarea>
        </div>
        <MediaBasket />
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
export default connect(mapStateToProps)(DayView);