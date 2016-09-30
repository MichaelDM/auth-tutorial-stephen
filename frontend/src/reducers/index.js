import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import sensitivedataReducer from './dataReducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  data: sensitivedataReducer,
});

export default rootReducer;
