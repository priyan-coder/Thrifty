import SalesActionTypes from './SalesActionTypes';

const INITIAL_STATE = {
  posts: []
};

// reducer is a function that gets two parameters
// currentState i.e. slice of relevant state passed from the redux store whenever an action is fired
// action i.e. an object with the following properties, type and payload
// All reducers get all actions that get fired but it checks against the type of action to decide
// if it has to return the currentState or the newState object
const SalesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SalesActionTypes.SET_SALES_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    default:
      return state;
  }
};

export default SalesReducer;
