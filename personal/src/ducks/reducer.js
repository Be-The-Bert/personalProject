const initialState = {
  user: false,
  redirect: false,
  userInfo: {},
  media: [],
  pages: [],
  groups: [],
  sections: []
}

const CHECKUSER = 'CHECKUSER';
const GETUSERINFO = 'GETUSERINFO';
const GETMEDIA = 'GETMEDIA';
const GETPAGES = 'GETPAGES';
const GETGROUPS = 'GETGROUPS';
const GETSECTIONS = 'GETSECTIONS';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHECKUSER + '_PENDING':
      console.log('checkuser pending');
      return state
    case CHECKUSER + '_FULFILLED':
      console.log('checkuser fulfilled', action.payload);
      return Object.assign({}, state, {
        user: action.payload,
        redirect: true
      })
    case GETUSERINFO + '_FULFILLED':
      return Object.assign({}, state, {
        userInfo: action.payload
      })
    case GETMEDIA + '_FULFILLED':
    console.log('getmedia reducer', action.payload);
      return Object.assign({}, state, {
        media: action.payload
      }) 
    case GETPAGES + '_FULFILLED':
      return Object.assign({}, state, {
        pages: action.payload
      })
    case GETGROUPS + '_FULFILLED':
      return Object.assign({}, state, {
        groups: action.payload
      })
    case GETSECTIONS + '_FULFILLED':
      return Object.assign({}, state, {
        sections: action.payload
      })
    default:
      return state
  }
}