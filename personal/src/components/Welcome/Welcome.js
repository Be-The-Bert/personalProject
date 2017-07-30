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

        <div className='leftTextBlock'>
          <div className='headerBox'>
            <h4>Setup</h4>
          </div>
          <div className='bulletPoints'>
            <h5>Sign up for an account</h5>
            <p>We use Auth0, a third party that specializes in security, to manage your account. Your information is safe with us.</p>
            <h5>Create your classroom</h5>
            <p>Add students and admins to your new group with a click of a button. Then set up your curriculum schedule and you're ready to go</p>
            <h5>Start sharing resources</h5>
            <p>And just like that, you're ready to start sharing links an image with your class</p>
          </div>
        </div>

        <div className='rightTextBlock'>
          <div className='bulletPoints'>
            <h5>Keep daily notes</h5>
            <p>For every day of class you and your students have a place to write your notes.</p>
            <h5>Watch your basket grow</h5>
            <p>Add the links for the homework, an image of a helpful diagram, and an interesting article. See the resources your students share with each other. Everything is kept in one place and easy to find later.</p>
          </div>
          <div className='headerBox'>
            <h4>Daily Pages</h4>
          </div>
        </div>

        <div className='leftTextBlock'>
          <div className='headerBox'>
            <h4>Dashboard</h4>
          </div>
          <div className='bulletPoints'>
            <h5>See all your resources together</h5>
            <p>Go to your dashboard to see all the resources you have on your account. Sort them by group or section if you like.</p>
            <h5>Jump to any day</h5>
            <p>Your dashboard shows you all your Daily Pages. These can also be grouped by group or section for easy access.</p>
          </div>
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