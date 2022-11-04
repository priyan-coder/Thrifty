import { createSelector } from 'reselect';

const SelectSalesReducer = (state) => state.sales;

export const SelectSalesPosts = createSelector(
  [SelectSalesReducer],
  (SalesPosts) => SalesPosts.posts
);
