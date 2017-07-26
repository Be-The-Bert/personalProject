import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './MediaBasket.css';

const io = require('socket.io-client');
const socket = io();

class MediaBasket extends Component {
  constructor(props) {
    super(props);
    this.state ={
      inputval: ''
    }
    socket.on('receive testtext', payload => {
      this.updateInputFromSockets(payload)
    })
    this.handleChange = this.handleChange.bind(this);
    this.updateInputFromSockets = this.updateInputFromSockets.bind(this);
  }
  componentDidMount() {
    console.log(this.props.match.params.dayid);
    socket.emit('basket', {basket: this.props.match.params.dayid});
    this.updateInputFromSockets();
  }
  componentWillReceiveProps(nextProps) {
    socket.emit('basket', {day: this.props.match.params.dayid});
  }
  componentWillUnmount() {
    socket.emit('leave basket', {day: this.props.match.params.dayid});
  }
  updateInputFromSockets() {
    socket.on('receive testtext', testtext => {
      this.setState(Object.assign({}, this.state, {inputval: testtext}))
    })
  }
  handleChange(e) {
    this.setState(Object.assign({}, this.state, {inputval: e.target.value}))
    socket.emit('upload', {
      basket: this.props.match.params.dayid,
      testtext: e.target.value
    })
  }
  render(){
    return(
      <div id='MediaBasket'>
        <div className='blueSlide'>
          <h2>MediaBasket</h2>
          <input value={this.state.inputval} onChange={this.handleChange}></input>
        </div>
      </div> 
    )
  }
}
function mapStateToProps(state) {
  return {
    groups: state.groups,
    sections: state.sections,
    pages: state.pages
  }
}
export default withRouter(connect(mapStateToProps)(MediaBasket));