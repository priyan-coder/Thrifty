import { createSelector } from 'reselect';

const SelectReviewsReducer = (state) => state.reviews;

export const SelectReviewsTodo = createSelector(
  [SelectReviewsReducer],
  (reviews) => reviews.reviewsTodo
);
