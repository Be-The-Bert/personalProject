import React, { Component } from 'react';
import axios from 'axios';
import { Image } from 'cloudinary-react';


export default class Uploader extends Component {
  constructor() {
    super();
    this.loadImageFileAsURL = this.loadImageFileAsURL.bind(this);
    this.upload = this.upload.bind(this);
  }
  loadImageFileAsURL(e) {
    let files = e.target.value
    console.log(files)
		// var fileToLoad = file

		// var fileReader = new FileReader();
    // let result;
		// fileReader.onload = function(fileLoadedEvent) 
		// {
		// 	// var textAreaFileContents = document.getElementById("textAreaFileContents");
	
		// 	result = fileLoadedEvent.target.result;
    // console.log(result);
		// };

    // 
}
  upload(e) {
    let files = e.target.files;
    let file = files[0];
    let fileReader = new FileReader();
    let result;
    fileReader.onload = function(fileLoadedEvent){
      result = fileLoadedEvent.target.result;
      console.log(result);
      axios.post('/api/upload', {result}).then(res => console.log(res.data))
    }
    fileReader.readAsDataURL(file);
    // console.log(file);
    // this.loadImageFileAsURL(file);
    // let formData = new FormData();
    // formData.append('file', file);
    // console.log(formData);
  }
  render() {
    return (
      <div id='Uploader'>
        hi
        
          
         <input type='file' onChange={this.upload}></input> 
        <Image cloudName="be-the-bert"/>
      </div>
    )
  }
}