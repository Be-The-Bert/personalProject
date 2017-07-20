import axios from 'axios';

const CHECKUSER = 'CHECKUSER';

export function checkUser(){
  console.log('checkuser action fired');
  let promise = axios.get('/api/checkuser').then(res => res.data);
  return {
    type: CHECKUSER,
    payload: promise
  }
}