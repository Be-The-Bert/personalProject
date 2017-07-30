import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Uploader.css';

const io = require('socket.io-client');
const socket = io();

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: null,
      uploadflag: false,
      imageSource: '',
      imageInput: 'No Image Selected',
      sourceInput: 'source(url)',
      titleInput: 'title',
      descriptionInput: 'description'
    }
    this.handleChange = this.handleChange.bind(this);
    this.upload = this.upload.bind(this);
    this.clear = this.clear.bind(this);
    this.unclear = this.unclear.bind(this);
    this.preview = this.preview.bind(this);
  }
  componentWillReceiveProps(newProps) {
    this.setState(Object.assign({}, this.state, {uploadflag: newProps.flag}))
  }
  upload() {
    socket.emit('media upload', {
        image: this.state.imageSource,
        source: this.state.sourceInput,
        title: this.state.titleInput,
        description: this.state.descriptionInput,
        userid: this.props.userInfo.id,
        dayid: this.props.match.params.dayid
    })
      this.props.toggleUpload();
  }
  handleChange(statePiece, value) {
    this.setState(Object.assign({}, this.state, {[statePiece]: value}))
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
  preview(e) {
    let files = e.target.files;
    let file = files[0];
    let fileReader = new FileReader();
    let result;
    fileReader.onload = function(fileLoadedEvent){
      result = fileLoadedEvent.target.result;
      this.setState(Object.assign({}, this.state, {imageSource: result, imageInput: ''}))
    }
    fileReader.onload = fileReader.onload.bind(this);
    fileReader.readAsDataURL(file);
  }
  render() {
    let imageStyle = {
      backgroundImage: `url(${this.state.imageSource})`
    }
    return (
      <div id='Uploader'>
        {this.state.uploadflag
        ?
          <div>
            <div className='transparent' onClick={this.props.toggleUpload}></div>
            <div className='box'>
              <div className='image' style={imageStyle}>{this.state.imageInput}</div>
              <input type='file' onChange={e => this.preview(e)}></input> 
              <input type='text' value={this.state.sourceInput} className='source' onChange={(e) => this.handleChange('sourceInput', e.target.value)} onFocus={() => this.clear('sourceInput', 'source(url)')} onBlur={() => this.unclear('sourceInput', 'source(url)')}></input>
              <input type='text' value={this.state.titleInput} className='title' onChange={(e) => this.handleChange('titleInput', e.target.value)} onFocus={() => this.clear('titleInput', 'title')} onBlur={() => this.unclear('titleInput', 'title')}></input>
              <textarea value={this.state.descriptionInput} className='description' onChange={(e) => this.handleChange('descriptionInput', e.target.value)} onFocus={() => this.clear('descriptionInput', 'description')} onBlur={() => this.unclear('descriptionInput', 'description')}></textarea>
              <button onClick={this.upload}>Upload</button>
            </div>
          </div>
         :
          null
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
export default withRouter(connect(mapStateToProps)(Uploader));