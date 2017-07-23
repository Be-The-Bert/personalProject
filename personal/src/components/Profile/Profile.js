import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import redirect from './../../services/redirect';
import { getMedia, getPages, getGroups } from './../../ducks/actions';

import Media from './../Media/Media';
import DailyPages from './../DailyPages/DailyPages';
import Groups from './Groups/Groups';

import './Profile.css';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      flag: true
    }
  }
  componentDidMount(){
    if (this.props.history.location.pathname === '/profile') {
      this.props.history.push('/profile/media')
    };
  }
  render(){
    if (this.props.redirect) {
      redirect.mainRedirect(this.props.history.push, this.props.user);
    }
    if (this.props.user && this.state.flag) {
      this.props.getMedia(this.props.userInfo.id);
      this.props.getPages(this.props.userInfo.id);
      this.props.getGroups(this.props.userInfo.id);
      this.setState({flag: false})
    }
    const bigpicStyle = {
      backgroundImage: `url(${this.props.userInfo.picture})`
    }
    return(
      <div id='Profile'>
        <div className='dashboard'>
          <div className='bluestripe'>
            <h1>{this.props.userInfo.name}</h1>
          </div>
          <div className='whitestripe'>
            <Link className='links' to='/profile/media'>Media</Link>
            <Link className='links' to='/profile/pages'>Daily Pages</Link>
            <Link className='links' to='/profile/groups'>Groups</Link>
          </div>
          <div className='bigpic' style={bigpicStyle}></div>
        </div>
          <Switch>
            <Route path='/profile/media' render={() => {
              return <Media media={this.props.media}/>
            }}/>
            <Route path='/profile/pages' render={() => {
              return <DailyPages pages={this.props.pages}/>
            }}/>
            <Route path='/profile/groups' render={() => {
              return <Groups groups={this.props.groups}/>
            }}/>
          </Switch>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    user: state.user,
    redirect: state.redirect,
    userInfo: state.userInfo,
    media: state.media,
    pages: state.pages,
    groups: state.groups
  }
}
export default connect(mapStateToProps, { getMedia, getPages, getGroups })(Profile);