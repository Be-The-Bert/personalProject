import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Media from './../Media/Media';
import Uploader from './../UploaderTest';

import './MediaBasket.css';

class MediaBasket extends Component {
  constructor(props) {
    super(props);
    this.state ={
      basketflag: false,
      inputval: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.toggleBasket = this.toggleBasket.bind(this);
  }
  handleChange(e) {
    this.setState(Object.assign({}, this.state, {inputval: e.target.value}))
  }
  toggleBasket() {
    this.setState(Object.assign({}, this.state, {basketflag: !this.state.basketflag}))
  }
  render(){
    return(
      <div id='MediaBasket'>
        <Uploader />
        <div className={`${this.state.basketflag ? 'blueSlideOut' : ''} blueSlide`}>
            <h1 className='sideways' onClick={this.toggleBasket}>Media Basket</h1>
          {!this.state.basketflag
          ?
          null
          :
            <div className='clickCatch' onClick={this.toggleBasket}></div>
          }
          <Media />
        </div>
      </div> 
    )
  }
}
function mapStateToProps(state) {
  return {
    groups: state.groups,
    sections: state.sections,
    pages: state.pages
  }
}
export default withRouter(connect(mapStateToProps)(MediaBasket));