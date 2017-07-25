import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Media.css';

class Media extends Component {
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
    console.log(this.props.media);
    let group = this.props.media.filter(media => media.groupid - 2 == this.props.match.params.groupid);
    return(
      <div className='Media'>
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
    media: state.media
  }
}
export default withRouter(connect(mapStateToProps)(Media));