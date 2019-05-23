import { combineReducers } from 'redux';

import auth from './auth';
import todolist from './todolist';

const rootReducer = combineReducers({
  auth,
  todolist,
});

export default rootReducer;
