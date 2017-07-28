import axios from 'axios';

const CHECKUSER = 'CHECKUSER';
const GETUSERINFO = 'GETUSERINFO';
const GETMEDIA = 'GETMEDIA';
const GETPAGES = 'GETPAGES';
const GETGROUPS = 'GETGROUPS';
const GETSECTIONS = 'GETSECTIONS';
const UPDATEMEDIA = 'UPDATEMEDIA';

export function checkUser(){
  console.log('checkuser action fired');
  let promise = axios.get('/api/checkuser').then(res => res.data);
  return {
    type: CHECKUSER,
    payload: promise
  }
};
export function getUserInfo(){
  let promise = axios.get('/api/userinfo').then(res => res.data[0]);
  return {
    type: GETUSERINFO,
    payload: promise
  }
}
export function getMedia(id){
  console.log('getMedia fired');
  let promise = axios.get(`/api/media/${id}`).then(res => res.data);
  return {
    type: GETMEDIA,
    payload: promise
  }
}
export function getPages(id){
  let promise = axios.get(`/api/pages/${id}`).then(res => res.data);
  return {
    type: GETPAGES,
    payload: promise
  }
}
export function getGroups(id) {
  let promise = axios.get(`/api/groups/${id}`).then(res => res.data);
  return {
    type: GETGROUPS,
    payload: promise
  }
}
export function getSections(id) {
  let promise = axios.get(`/api/sections/${id}`).then(res => res.data);
  return {
    type: GETSECTIONS,
    payload: promise
  }
}
export function updateMedia(payload) {
  console.log('update media fired');
  return {
    type: UPDATEMEDIA,
    payload
  }
}



