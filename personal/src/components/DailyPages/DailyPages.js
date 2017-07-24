import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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
        <h1>{this.props.label} Daily Pages</h1>
          {
            this.props.pages.map((page, i) => {
              const clsname = `page${i}`
              if (!this.props.match.params.groupid) {
                return (
                  <div key={i} className='pageBlock' onMouseOver={() => this.hoverOn(clsname)} onMouseOut={() => this.hoverOff(clsname)}>
                    <h2 className={`date`}>{page.date}</h2>
                    <h3 className={`groupName`}>{page.groupname}</h3>
                    <h3 className={`sectionName`}>{page.sectionname}</h3>
                    <Link to={`/pages/${page.dayid}`}>
                    <div className={`${clsname} transparent switch`}></div>
                    <h2 className={`${clsname} link switch`}>Jump to Day</h2>
                    </Link> 
                  </div>
                )
              } else if (!this.props.match.params.sectionid) {
                if (this.props.match.params.groupid == page.groupid) {
                  return (
                    <div key={i} className='pageBlock' onMouseOver={() => this.hoverOn(clsname)} onMouseOut={() => this.hoverOff(clsname)}>
                      <h2 className={`date`}>{page.date}</h2>
                      <h3 className={`groupName`}>{page.groupname}</h3>
                      <h3 className={`sectionName`}>{page.sectionname}</h3>
                      <Link to={`/pages/${page.dayid}`}>
                      <div className={`${clsname} transparent switch`}></div>
                      <h2 className={`${clsname} link switch`}>Jump to Day</h2>
                      </Link> 
                    </div>
                  )
                }
              } else {
                if (this.props.match.params.sectionid == page.sectionid) {
                  return (
                    <div key={i} className='pageBlock' onMouseOver={() => this.hoverOn(clsname)} onMouseOut={() => this.hoverOff(clsname)}>
                      <h2 className={`date`}>{page.date}</h2>
                      <h3 className={`groupName`}>{page.groupname}</h3>
                      <h3 className={`sectionName`}>{page.sectionname}</h3>
                      <Link to={`/pages/${page.dayid}`}>
                      <div className={`${clsname} transparent switch`}></div>
                      <h2 className={`${clsname} link switch`}>Jump to Day</h2>
                      </Link> 
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
    pages: state.pages
  }
}
export default withRouter(connect(mapStateToProps)(DailyPages));