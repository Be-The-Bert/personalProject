import React, { Component } from 'react'

import './GroupForm.css';

export default class GroupForm extends Component {
  constructor(props) {
    super(props);
    this.state ={
      name: 'Group Name',
      members: [
        {
          name: 'Sally',
          userid: 4,
          admin: true
        }
      ],
      sectionName: 'Section Name',
      sections: [
        {
          name: 'test',
          days: ['May 4', 'May 5']
        }
      ],
      memberflag: false,
      dayflag: false
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSectionNameChange = this.handleSectionNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clear = this.clear.bind(this);
    this.unclear = this.unclear.bind(this);
    this.toggleDayModul = this.toggleDayModul.bind(this);
  }
  handleNameChange(e) {
    this.setState(Object.assign({}, this.state, {name: e.target.value}))
  }
  handleSectionNameChange(e) {
    this.setState(Object.assign({}, this.state, {sectionName: e.target.value}))
  }
  handleSubmit(e) {
    e.preventDefault();
    let sections = this.state.sections.slice('');
    let name = this.state.sectionName;
    sections.push({name, days: []});
    this.setState(Object.assign({}, this.state, {
      sections,
      sectionName: 'Section Name'
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
  toggleDayModul() {
    this.setState(Object.assign({}, this.state, {dayflag: !this.state.dayflag}))
  }
  render(){
    return(
      <div id='GroupForm'>
        <h1>{this.props.title} Group</h1>
        <h2>Name:</h2>
        <input value={this.state.name} onChange={this.handleNameChange} onFocus={() => this.clear('name', 'Group Name')} onBlur={() => this.unclear('name', 'Group Name')}></input>
        <div className='membersHeader'>
          <h2>Members</h2>
          <button className='addMember'>Add Member</button>
        </div>
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
              <div className='addDay' onClick={this.toggleDayModul}>+</div>
            </div>
          })
        }
        </div>
        {this.state.dayflag 
        ?
          <div>
            <div className='transparent' onClick={this.toggleDayModul}> 
            </div>
            <div className='dayModul'>
            </div>
          </div>
        :
          null
        }
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.sectionName} onChange={this.handleSectionNameChange} onFocus={() => this.clear('sectionName', 'Section Name')} onBlur={() => this.unclear('sectionName', 'Section Name')}></input>
          <p onClick={this.handleSubmit}>add</p>
        </form>
        <button className='createSaveButton' onClick={() => this.props.callback(this.state.name, this.state.members, this.state.sections)}>{this.props.button}</button>
      </div>
    )
  }
}