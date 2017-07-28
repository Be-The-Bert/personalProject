import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import redirect from './../../services/redirect';
import { getMedia, getPages, getGroups, getSections } from './../../ducks/actions';

import SideNav from './../Nav/SideNav';
import Media from './../Media/Media';
import DailyPages from './../DailyPages/DailyPages';
import GroupDash from './../GroupDash/GroupDash';

import './Dashboard.css';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      flag: true
    }
  }
  componentDidMount(){
    if (this.props.history.location.pathname === '/dashboard') {
      this.props.history.push('/dashboard/media')
    };
  }
  render(){
    if (this.props.redirect) {
      redirect.mainRedirect(this.props.history.push, this.props.user);
    }
    if (this.props.userInfo.id && this.state.flag) {
      this.props.getMedia(this.props.userInfo.id);
      this.props.getPages(this.props.userInfo.id);
      this.props.getGroups(this.props.userInfo.id);
      this.props.getSections(this.props.userInfo.id);
      this.setState({flag: false})
    }
    console.log(this.props.match.params)
    return(
      <div id='Dashboard'>
        <SideNav />
          <Switch>
            <Route path='/dashboard/media' render={() => {
              return <div>
                <div className='blueBox'><h1>All - Media</h1></div>
                <Media userid={this.props.userInfo.id}/>
                </div>
            }}/>
            <Route path='/dashboard/pages' render={() => {
              return <div>
                <div className='blueBox'><h1>All - Pages</h1></div>
                <DailyPages />
                </div>
            }}/>
            <Route component={GroupDash} path='/dashboard/:groupid' />
          </Switch>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    user: state.user,
    redirect: state.redirect,
    userInfo: state.userInfo
  }
}
export default connect(mapStateToProps, { getMedia, getPages, getGroups, getSections })(Dashboard);