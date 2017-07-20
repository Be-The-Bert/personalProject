import React, { Component } from 'react';
import { connect } from 'react-redux';

import { checkUser } from './../../ducks/actions';

class Nav extends Component {

  render(){
    return(
      <div>
        Nav
        {this.props.user === true
        ?
          'you are logged in'
        : 
          'you are not logged in'}
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps, { checkUser })(Nav);