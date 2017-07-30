import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Media from './../Media/Media';
import Uploader from './Uploader';

import './MediaBasket.css';

class MediaBasket extends Component {
  constructor(props) {
    super(props);
    this.state ={
      basketflag: false,
      uploadflag: false,
      inputval: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.toggleBasket = this.toggleBasket.bind(this);
    this.toggleUpload = this.toggleUpload.bind(this);
  }
  handleChange(e) {
    this.setState(Object.assign({}, this.state, {inputval: e.target.value}))
  }
  toggleBasket() {
    this.setState(Object.assign({}, this.state, {basketflag: !this.state.basketflag}))
  }
  toggleUpload() {
    this.setState(Object.assign({}, this.state, {uploadflag: !this.state.uploadflag}))
  }
  render(){
    return(
      <div id='MediaBasket'>
        <div className={`${this.state.basketflag ? 'blueSlideOut' : ''} blueSlide`}>
            <h1 className='sideways'>Media Basket</h1>
            <div className='clickCatch' onClick={this.toggleBasket}></div>
          {!this.state.basketflag
          ?
          null
          :
            <div className='clickCatchBackground' onClick={this.toggleBasket}></div>
          }
          <Media />
          <button className='uploadModulButton' onClick={this.toggleUpload}>+</button>
          
            <Uploader flag={this.state.uploadflag} toggleUpload={this.toggleUpload}/>
          
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