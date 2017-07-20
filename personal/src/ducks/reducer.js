const initialState = {
  user: false,
  redirect: false,
  userInfo: {
    email: 'mrsbethtelford@gmail.com',
    username: 'BeTheBert',
    name: 'Joe Lastname',
    profilepic: 'http://img.timeinc.net/time/daily/2010/1011/poy_nomination_agassi.jpg'
  }
}

const CHECKUSER = 'CHECKUSER';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHECKUSER + '_PENDING':
    console.log('checkuser pending');
      return state
    case CHECKUSER + '_FULFILLED':
    console.log('checkuser fulfilled', action.payload);
      return {
        user: action.payload,
        redirect: true
      }
    default:
      return state
  }
}