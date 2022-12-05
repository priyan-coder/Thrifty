import ReviewsActionTypes from './ReviewsActionTypes';

/*
Todo will contain the product for which a review has to be done i.e. array of objects 
*/

const REVIEWS_INITIAL_STATE = {
  reviewsTodo: []
};

const ReviewsReducer = (state = REVIEWS_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case ReviewsActionTypes.SET_REVIEWS_TODO:
      return {
        ...state,
        reviewsTodo: payload
      };
    default:
      return state;
  }
};

export default ReviewsReducer;
