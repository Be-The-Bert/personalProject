import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import './GroupForm.css';

class GroupForm extends Component {
  constructor(props) {
    super(props);
    this.state ={
      name: 'Group Name',
      allusers: [],
      members: [],
      memberflag: false,
      emailvalue: 'User email',
      adminvalue: false,
      oops: '',
      sectionName: 'Section Name',
      sections: [],
      dayflag: false,
      currentSection: null,
      mvalue: 'MM',
      dvalue: 'DD',
      yvalue: 'YYYY'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clear = this.clear.bind(this);
    this.unclear = this.unclear.bind(this);
    this.toggle = this.toggle.bind(this);
    this.addMember = this.addMember.bind(this);
    this.deleteMember = this.deleteMember.bind(this);
    this.addDay = this.addDay.bind(this);
  }
  componentDidMount(){
    console.log('did mount');
    axios.get('/api/users').then(res => {
      console.log('axios');
      this.setState(Object.assign({}, this.state, {allusers: res.data}))
    }).catch(err => console.log(err))
  }
  handleChange(statePiece, value) {
    this.setState(Object.assign({}, this.state, {[statePiece]: value}))
  }
  handleSubmit(e) {
    e.preventDefault();
    let sections = this.state.sections.slice('');
    let name = this.state.sectionName;
    sections.push({name, days: []});
    this.setState(Object.assign({}, this.state, {
      sections,
      sectionName: ''
    }));
  }
  clear(statePiece, defaultString){
    this.state[statePiece] === defaultString
    ?
      this.setState(Object.assign({}, this.state, {[statePiece]: ''}))
    :
      null
  }
  unclear(statePiece, defaultString){
    this.state[statePiece] === ''
    ?
      this.setState(Object.assign({}, this.state, {[statePiece]: defaultString}))
    :
      null
  }
  toggle(statePiece) {
    this.setState(Object.assign({}, this.state, {[statePiece]: !this.state[statePiece]}))
  }
  addMember() {
    let members = [...this.state.members];
    let { emailvalue, adminvalue } = this.state;
    let user = this.state.allusers.filter(user => user.email === emailvalue);
    console.log(user);
    if (user.length) {
      user = user[0];
      user.admin = adminvalue;
      members.push(user);
      this.setState(Object.assign({}, this.state, {
        members,
        emailvalue: 'User email',
        adminvalue: false,
        oops: '',
        memberflag: false
      }))
    } else {
      this.setState(Object.assign({}, this.state, {
        emailvalue: 'User email',
        adminvalue: false,
        oops: 'Oops! There is no user with that email address'
      }))
    }
  }
  deleteMember(index) {
    let members = [...this.state.members];
    members.splice(index, 1);
    this.setState(Object.assign({}, this.state, {members}))
  }
  addDay() {
    let sections = [...this.state.sections]
    let { mvalue, dvalue, yvalue } = this.state;
    mvalue === 'MM' ? mvalue = '' : null
    dvalue === 'DD' ? dvalue = '' : null
    yvalue === 'YYYY' ? yvalue = '' : null
    sections[this.state.currentSection].days.push(`${mvalue} ${dvalue} ${yvalue}`)
    this.setState(Object.assign({}, this.state, {
      sections,
      mvalue: 'MM',
      dvalue: 'DD',
      yvalue: 'YYYY',
      dayflag: false
    }))
  
  }
  render(){
    console.log(this.props);
    return(
      <div id='GroupForm'>
        <h1>{this.props.title} Group</h1>
        <h2>Name:</h2>
        <input value={this.state.name} onChange={(e) => this.handleChange('name', e.target.value)} onFocus={() => this.clear('name', 'Group Name')} onBlur={() => this.unclear('name', 'Group Name')}></input>
        <h2>Members</h2>
        <div className='memberList'>
        {
          this.state.members.map((member, i) => {
            return <div className='memberBlock' key={i}>
                <h3>{member.name}</h3>
                <p onClick={() => this.deleteMember(i)}>delete</p>
                {member.admin
                ?
                  <h4>admin</h4>
                :  
                  <h4>student</h4>
                }
              </div>
          })
        }
        </div>
        <button className='addMember' onClick={() => this.toggle('memberflag')}>Add Member</button>
        {this.state.memberflag 
        ?
          <div>
            <div className='transparent' onClick={() => this.toggle('memberflag')} > 
            </div>
            <div className='memberModul'>
              <h1>Enter User Email Address</h1>
              <div className='inputBox'>
                <input className='emailInput' value={this.state.emailvalue} onChange={(e) => this.handleChange('emailvalue', e.target.value)} onFocus={() => this.clear('emailvalue', 'User email')} onBlur={() => this.unclear('emailvalue', 'User email')}></input>
                <input className='adminInput' type='checkbox' onClick={() => this.toggle('adminvalue')}></input>
                <h4>Admin</h4>
              </div>
              <h4>{this.state.oops}</h4>
              <button onClick={this.addMember}>add</button>
            </div>
          </div>
        :
          null
        }
        <h2>Sections</h2>
        <div className='sectionList'>
        {
          this.state.sections.map((section, i) => {
            return <div className='sectionBlock' key={i}>
              <div className='headerBox'>
                <h3>{section.name}</h3>
                <p>delete</p>
                <p>edit</p>
              </div>
               {
                this.state.sections[i].days.map((day, i) => {
                  return <div className='daysList' key={i}>
                    <p>{day}</p>
                  </div>
                })
              } 
              <div className='addDay' onMouseUp={() => this.setState(Object.assign({}, this.state, {currentSection: i}))} onClick={() => this.toggle('dayflag')}>+</div>
            </div>
          })
        }
        </div>
        {this.state.dayflag 
        ?
          <div>
            <div className='transparent' onClick={() => this.toggle('dayflag')} > 
            </div>
            <div className='dayModul'>
              <h1>Enter Date</h1>
              <div className='dateBox'>
                <input value={this.state.mvalue} onChange={e => this.handleChange('mvalue', e.target.value)} onFocus={() => this.clear('mvalue', 'MM')} onBlur={() => this.unclear('mvalue', 'MM')}></input>
                <input value={this.state.dvalue} onChange={e => this.handleChange('dvalue', e.target.value)} onFocus={() => this.clear('dvalue', 'DD')} onBlur={() => this.unclear('dvalue', 'DD')}></input>
                <input value={this.state.yvalue} onChange={e => this.handleChange('yvalue', e.target.value)} onFocus={() => this.clear('yvalue', 'YYYY')} onBlur={() => this.unclear('yvalue', 'YYYY')}></input>
              </div>
              <button onClick={this.addDay}>add</button>
            </div>
          </div>
        :
          null
        }
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.sectionName} onChange={(e) => this.handleChange('sectionName', e.target.value)} onFocus={() => this.clear('sectionName', 'Section Name')} onBlur={() => this.unclear('sectionName', 'Section Name')}></input>
          <p onClick={this.handleSubmit}>add</p>
        </form>
        <button className='createSaveButton' onClick={() => {
          this.props.callback(this.state.name, this.state.members, this.state.sections)
          this.props.history.goBack()}}>{this.props.button}</button>
      </div>
    )
  }
}
export default withRouter(GroupForm);