import { combineReducers } from 'redux';
import UserReducer from './User/UserReducer';

// The root reducer is an overall reducer
// that combines all the reducers which we use
// Using combineReducers we create the root reducer object
// UserReducer gets a slice of user related state
const RootReducer = combineReducers({
  user: UserReducer
});

export default RootReducer;
