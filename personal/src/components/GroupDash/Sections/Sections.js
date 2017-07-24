import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Media from './../../Media/Media';
import DailyPages from './../../DailyPages/DailyPages';

import './Sections.css';

class Sections extends Component {
  constructor (props){
    super(props);
    let section = {};
    for (let i = 0; i < this.props.sections.length; i++) {
      if (this.props.sections[i].id == this.props.match.params.sectionid) {
        section = Object.assign(this.props.sections[i]);
      }
    }
    this.state = {
      sectionname: section.name
    }
  }
  render(){
    return(
      <div id='Sections'>
        <div className='days'>
          <DailyPages pages={this.state.pages} label={this.state.sectionname} />
        </div>
        <div className='media'>
          <Media media={this.state.media} label={this.state.sectionname}/> 
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    user: state.user
  }
}
export default withRouter(connect(mapStateToProps)(Sections));