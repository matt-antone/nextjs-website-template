import {ADD_UA} from '../actions/uaActions'
const uaReducer = (state = {value: null}, action) => {
  switch (action.type) {
    case ADD_UA:
        return {...state, ua: null}
    default:
        return {...state}
  }
};

export default uaReducer