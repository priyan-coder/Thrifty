import UserActionTypes from './UserActionTypes';
import CreateAction from '../Utils/CreateAction';

const SetCurrentUser = (user) =>
  CreateAction(UserActionTypes.SET_CURRENT_USER, user);

export default SetCurrentUser;
