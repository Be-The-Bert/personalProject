import React, { Component } from 'react';

import './DailyPages.css';

class DailyPages extends Component {
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
      <div className='DailyPages'>
          {
            this.props.pages.map((page, i) => {
              const clsname = `page${i}`
              return (
                <div key={i} className='pageBlock' onMouseOver={() => this.hoverOn(clsname)} onMouseOut={() => this.hoverOff(clsname)}>
                  <h2 className={`groupName`}>{page.groupname}</h2>
                  <h3 className={`sectionName`}>{page.sectionname}</h3>
                  <h3 className={`date`}>{page.date}</h3>

                  <div className={`${clsname} transparent switch`}></div>
                  <h2 className={`${clsname} link switch`}>see Details</h2>
                </div>
              )
            })
          }
      </div>
    )
  }
}
export default DailyPages;