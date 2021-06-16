import notificationReducer from './notificationReducer'
import uaReducer from './uaReducer'

import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    notification: notificationReducer,
    ua: uaReducer,
});

export default rootReducer;