import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getMedia } from './../../ducks/actions';

import './Media.css';

const io = require('socket.io-client');
const socket = io();

class Media extends Component {
  constructor(){
    super();
    socket.on('please update', () => {
      this.dispatchUpdateCheck();
    })
    socket.on('receive media data', payload => {
      this.dispatchMediaActionCreator(payload)
    })
    this.dispatchUpdateCheck = this.dispatchUpdateCheck.bind(this);
  }
  dispatchUpdateCheck () {
    console.log('receiving broadcast');
      this.props.getMedia(this.props.userInfo.id)
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
          {this.props.media.map((media, i) => {
            const imagestyle = {backgroundImage: `url(${media.img})`};
            const clsname = `media${i}`
            if (!this.props.match.params.groupid && !this.props.match.params.dayid) {
              return (
                <div key={i} className='mediaBlock' style={imagestyle} onMouseOver={() => this.hoverOn(clsname)} onMouseOut={() => this.hoverOff(clsname)}> 
                  <div className={`${clsname} transparent switch`}></div>
                  <h2 className={`${clsname} title switch`}>{media.title}</h2>
                  <a href={media.source} className={`${clsname} source switch`}>{media.source}</a>
                  <p className={`${clsname} description switch`}>{media.description}</p>
                  <h3 className={`${clsname} author switch`}>by {media.author}</h3>
                </div>
              )
            } else if (!this.props.match.params.sectionid && !this.props.match.params.dayid) {
              if (this.props.match.params.groupid == media.groupid){
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
            } else if (!this.props.match.params.dayid) {
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
            } else {
              if (this.props.match.params.dayid == media.dayid){
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
export default withRouter(connect(mapStateToProps, { getMedia })(Media));