import { combineReducers } from 'redux';

import characterReducer from './Characters/reducer';

const rootReducer = combineReducers({ characterReducer });

export default rootReducer;
