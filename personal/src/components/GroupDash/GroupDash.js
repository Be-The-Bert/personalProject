import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import redirect from './../../services/redirect';

import Media from './../Media/Media';
import DailyPages from './../DailyPages/DailyPages';
import Sections from './Sections/Sections';

import './GroupDash.css';

class GroupDash extends Component {
  componentDidMount(){
    if (this.props.history.location.pathname === `/groupdashboard/${this.props.match.params.groupname}`) {
      this.props.history.push(`/groupdashboard/${this.props.match.params.groupname}/media`)
    };
  }
  render(){
    if (this.props.redirect) {
      redirect.mainRedirect(this.props.history.push, this.props.user);
    }
    return(
      <div id='GroupDash'>
        <div className='header'>
          <h1>{this.props.match.params.groupname}</h1>
        </div>
        <div className='sidenav'>
          <Link to={`/groupdashboard/${this.props.match.params.groupname}/media`}>Group Media</Link>
          <Link to={`/groupdashboard/${this.props.match.params.groupname}/pages`}>Daily Pages</Link>
          <Link to={`/groupdashboard/${this.props.match.params.groupname}/sections`}>Sections</Link>
        </div>
        <div className='switchbucket'>
          <Switch>
            <Route path='/groupdashboard/:groupname/media' render={() => {
              return <Media media={this.props.media}/>
            }}/>
            <Route path='/groupdashboard/:groupname/pages' render={() => {
              return <DailyPages pages={this.props.pages}/>
            }}/>
            <Route path='/groupdashboard/:groupname/media' render={() => {
              return <Sections media={this.props.media}/>
            }}/>
            <Route component={Sections} path='/groupdashboard/:groupname/sections' />
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
    pages: state.pages
  }
}
export default connect(mapStateToProps)(GroupDash);