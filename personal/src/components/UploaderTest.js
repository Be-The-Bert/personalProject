import React, { Component } from 'react';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
// import ReactUpload from 'react-s3-upload';

// export default class Uploader extends Component {
//   render() {
//     return (
//       <div>
//         hiya
//       <ReactUpload 
//         onProgress={ (pct) => { console.log(pct) } }
//         onComplete={ (url) => { console.log(url) } }
//       />
//       </div>
//     )
//   }
// }






export default class Uploader extends Component {
  handleFinishedUpload = info => {
    console.log('File uploaded with filename', info.filename)
    console.log('Access it on s3 at', info.fileUrl)
  }
 
  render() {
    const uploadOptions = {
      server: 'http://localhost:4000',
      s3Url: 'https://class-baskets.s3.amazonaws.com/',
      signingUrlQueryParams: {uploadType: 'test'},
    }
 
    return (
      <DropzoneS3Uploader 
        signingUrl="/s3/sign"
        signingUrlMethod="GET"
        onFinish={this.handleFinishedUpload} 
        upload={uploadOptions}
        server='http://localhost:4000'
      />
    )
  }
}