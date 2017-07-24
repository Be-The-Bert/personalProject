import React, { Component } from 'react';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import redirect from './../../services/redirect';

import Media from './../Media/Media';
import DailyPages from './../DailyPages/DailyPages';
import Sections from './Sections/Sections';

// import './GroupDash.css';

class GroupDash extends Component {
  constructor (props){
    super(props);
    let group = {};
    for (let i = 0; i < this.props.groups.length; i++) {
      if (this.props.groups[i].groupid == this.props.match.params.groupid) {
        group = Object.assign(this.props.groups[i]);
      }
    }
    this.state = {
      groupname: group.name,
      media: [],
      pages: [],
      sections: []
    }
  }
  sort(groupid) {
    let media = this.props.media.filter(media => {
      return media.groupid === groupid - 2
    })
    let pages = this.props.pages.filter(pages => {
      return pages.groupid == groupid
    })
    let sections = this.props.sections.filter(sections => {
      return sections.groupid == groupid
    })
    this.setState(Object.assign({}, this.state, {media, pages, sections}));
  }
  componentDidMount(){
    
    this.sort(this.props.match.params.groupid);
  }
  render(){
    if (this.props.history.location.pathname === `/dashboard/${this.props.match.params.groupid}`) {
      this.props.history.push(`/dashboard/${this.props.match.params.groupid}/media`)
    };
    return(
      <div id='GroupDash'>
        <div className='switchbucket'>
          <Switch>
            <Route path='/dashboard/:groupid/media' render={() => {
              return <Media label={this.state.groupname}/>
            }}/>
            <Route path='/dashboard/:groupid/pages' render={() => {
              return <DailyPages pages={this.state.pages} label={this.state.groupname}/>
            }}/>
            <Route path='/dashboard/:groupid/sections/:sectionid' render={() => {
              return <Sections sections={this.state.sections}/>
            }}/>
          </Switch>
        </div> 
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    user: state.user,
    redirect: state.redirect,
    media: state.media,
    pages: state.pages,
    groups: state.groups,
    sections: state.sections
  }
}
export default withRouter(connect(mapStateToProps)(GroupDash));