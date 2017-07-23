import React, { Component } from 'react';

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
    return(
      <div className='Media'>
          {this.props.media.map((media, i) => {
            const imagestyle = {backgroundImage: `url(${media.img})`};
            const clsname = `media${i}`
            return (
              <div key={i} className='mediaBlock' style={imagestyle} onMouseOver={() => this.hoverOn(clsname)} onMouseOut={() => this.hoverOff(clsname)}> 
                <div className={`${clsname} transparent switch`}></div>
                <h2 className={`${clsname} title switch`}>{media.title}</h2>
                <h3 className={`${clsname} author switch`}>by {media.author}</h3>
                <a href={media.source} className={`${clsname} source switch`}>{media.source}</a>
                <p className={`${clsname} description switch`}>{media.description}</p>
              </div>
            )
          }) 
        }
      </div>
    )
  }
}
export default Media;