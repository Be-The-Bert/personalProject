import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { updateMedia } from './../../ducks/actions';

import Uploader from './../UploaderTest';

import './Media.css';

const io = require('socket.io-client');
const socket = io();

class Media extends Component {
  constructor(){
    super();
    this.state = {
      userid: null
    }
    socket.on('please update', payload => {
      this.dispatchUpdateCheck(payload)
    })
    socket.on('receive media data', payload => {
      this.dispatchMediaActionCreator(payload)
    })
    this.dispatchMediaActionCreator = this.dispatchMediaActionCreator.bind(this);
    this.dispatchUpdateCheck = this.dispatchUpdateCheck.bind(this);
    this.updateMedia = this.updateMedia.bind(this);
    this.uploadMedia = this.uploadMedia.bind(this);
    this.force = this.force.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.userInfo.id && nextProps.userInfo.id !== this.state.userid) {
      this.setState({userid: nextProps.userInfo.id})
      socket.emit('join', {userid: nextProps.userid});
    }
  }
  componentWillUnmount() {
    socket.emit('leave', {userid: this.state.userid});
  }
  dispatchMediaActionCreator(payload) {
    if (JSON.stringify(this.props.media) !== JSON.stringify(payload)) {
      this.props.updateMedia(payload);
    }
  }
  dispatchUpdateCheck () {
    if (this.state.userid !== null) {
      socket.emit('update check', {userid: this.state.userid})
    }
  }
  updateMedia () {
    //SEND A SOCKET EMIT WITH DATA UPDATES
  }
  uploadMedia () {
    //SEND A SOCKET EMIT WITH NEW DATA
  }
  force () {
    socket.emit('force update check')
  }
  hoverOn(name) {
    let elArray = document.getElementsByClassName(name);
    for (let i = 0; i < elArray.length; i++) {
      elArray[i].classList.remove('switch');
    }
  }
  hoverOff(name) {
    let elArray = document.getElementsByClassName(name);
    for (let i = 0; i < elArray.length; i++) {
      elArray[i].classList.add('switch');
    }
  }
  render(){
    return(
      <div className='Media'>
        <button onClick={this.force}>force</button>
        <Uploader />
          {this.props.media.map((media, i) => {
            const imagestyle = {backgroundImage: `url(${media.img})`};
            const clsname = `media${i}`
            if (!this.props.match.params.groupid) {
              return (
                <div key={i} className='mediaBlock' style={imagestyle} onMouseOver={() => this.hoverOn(clsname)} onMouseOut={() => this.hoverOff(clsname)}> 
                  <div className={`${clsname} transparent switch`}></div>
                  <h2 className={`${clsname} title switch`}>{media.title}</h2>
                  <a href={media.source} className={`${clsname} source switch`}>{media.source}</a>
                  <p className={`${clsname} description switch`}>{media.description}</p>
                  <h3 className={`${clsname} author switch`}>by {media.author}</h3>
                </div>
              )
            } else if (!this.props.match.params.sectionid) {
              if (this.props.match.params.groupid - 2 === media.groupid){
                return (
                  <div key={i} className='mediaBlock' style={imagestyle} onMouseOver={() => this.hoverOn(clsname)} onMouseOut={() => this.hoverOff(clsname)}> 
                    <div className={`${clsname} transparent switch`}></div>
                    <h2 className={`${clsname} title switch`}>{media.title}</h2>
                    <a href={media.source} className={`${clsname} source switch`}>{media.source}</a>
                    <p className={`${clsname} description switch`}>{media.description}</p>
                    <h3 className={`${clsname} author switch`}>by {media.author}</h3>
                  </div>
                )
              }
            } else {
              if (this.props.match.params.sectionid == media.sectionid){
                return (
                  <div key={i} className='mediaBlock' style={imagestyle} onMouseOver={() => this.hoverOn(clsname)} onMouseOut={() => this.hoverOff(clsname)}> 
                    <div className={`${clsname} transparent switch`}></div>
                    <h2 className={`${clsname} title switch`}>{media.title}</h2>
                    <a href={media.source} className={`${clsname} source switch`}>{media.source}</a>
                    <p className={`${clsname} description switch`}>{media.description}</p>
                    <h3 className={`${clsname} author switch`}>by {media.author}</h3>
                  </div>
                )
              }
            }
          }) 
        }
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    userInfo: state.userInfo,
    media: state.media
  }
}
export default withRouter(connect(mapStateToProps, { updateMedia })(Media));