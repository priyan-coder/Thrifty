import CreateAction from '../Utils/CreateAction';
import ReviewsActionTypes from './ReviewsActionTypes';

// review to Add is basically the product info
// essentially shifting cart items upon payment into reviewsTodo

const arrayUnique = (array) => {
  var a = array.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i].id === a[j].id) a.splice(j--, 1);
    }
  }
  return a;
};

const addProducts = (prevReviewsToDo, reviewsToAdd) => {
  return arrayUnique(prevReviewsToDo.concat(reviewsToAdd));
};

export const SetReviewsToDo = (reviewsToDo) => {
  return CreateAction(ReviewsActionTypes.SET_REVIEWS_TODO, reviewsToDo);
};

export const AddReviewsToReviewsToDo = (prevReviewsToDo, reviewsToAdd) => {
  const newReviewsToDo = addProducts(prevReviewsToDo, reviewsToAdd);
  return CreateAction(ReviewsActionTypes.SET_REVIEWS_TODO, newReviewsToDo);
};

// remove a product from reviewsTodo because user has completed the review for it
export const MarkReviewAsDone = (prevReviewsToDo, reviewToRemove) => {
  const newReviewsToDo = prevReviewsToDo.filter(
    (review) => review.id !== reviewToRemove.id
  );
  return CreateAction(ReviewsActionTypes.SET_REVIEWS_TODO, newReviewsToDo);
};
