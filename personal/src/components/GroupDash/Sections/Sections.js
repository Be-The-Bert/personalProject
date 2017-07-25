import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Media from './../../Media/Media';
import DailyPages from './../../DailyPages/DailyPages';

import './Sections.css';

class Sections extends Component {
  render(){
    let section = [''];
    if (this.props.sections.length) {
      section = this.props.sections.filter(section => {
        return section.id == this.props.match.params.sectionid
      })
    }
    console.log(section);
    return(
      <div id='Sections'>
        <h1>{section[0].name}</h1>
        <h2 className='header'>Pages</h2>
        <div className='days'>
          <DailyPages />
        </div>
        <h2 className='header'>Media</h2>
        <div className='media'>
          <Media/> 
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    sections: state.sections
  }
}
export default withRouter(connect(mapStateToProps)(Sections));