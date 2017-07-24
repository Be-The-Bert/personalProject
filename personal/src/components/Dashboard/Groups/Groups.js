import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Groups.css';

class Groups extends Component {
  render(){
    return( 
      <div id='Groups'>
          {
            this.props.groups.map((group, i) => {
              return (
                <div key={i} className='groupBlock'>
                  <div className='infoBlock'>
                    <h2 className={`groupName`}>{group.name}</h2>
                    {group.status
                    ?
                      <h3 className='status'>Active</h3>
                    :
                      <h3 className='status'>Inactive</h3>
                    }
                    {group.admin
                    ?
                      <h3 className='admin'>Admin</h3>
                    :
                      <h3 className='admin'>Student</h3>
                    }
                  </div>
                  <div className='buttonBlock'>
                    <Link to={'/'} className='button'>View Details</Link>
                    <Link to={`/groupdashboard/${group.groupid}`} className='button'>Dashboard</Link>
                  </div>
                </div>
              )
            })
          }
      </div>
    )
  }
}

export default Groups;