import { createSelector } from 'reselect';

const SelectUserReducer = (state) => state.user;

export const SelectCurrentUser = createSelector(
  [SelectUserReducer],
  (user) => user.currentUser
);
