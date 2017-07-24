import React, { Component } from 'react'

import './GroupForm.css';

export default class GroupForm extends Component {
  constructor(props) {
    super(props);
    this.state ={
      name: '',
      members: [
        {
          groupid: 5,
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
      ]
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSectionNameChange = this.handleSectionNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    console.log(sections);
    console.log(this.state.sections);
    sections.push({name, days: []});
    console.log(sections);
    console.log(this.state.sections);
    this.setState(Object.assign({}, this.state, {
      sections,
      sectionName: 'Section Name'
    }));
  }
  render(){
    return(
      <div id='GroupForm'>
        <h2>Name:</h2>
        <input value={this.state.name} onChange={this.handleNameChange}></input>
        <h2>Members</h2>
        
        <h2>Sections</h2>
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
              <div className='addDay'>+</div>
            </div>
          })
        }
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.sectionName} onChange={this.handleSectionNameChange}></input>
          <p onClick={this.handleSubmit}>add</p>
        </form>
      </div>
    )
  }
}