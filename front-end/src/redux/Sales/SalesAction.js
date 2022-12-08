import CreateAction from '../Utils/CreateAction';
import SalesActionTypes from './SalesActionTypes';

const addSalesPost = (salesPosts, postToAdd) => {
  const existingSalesPost = salesPosts.find(
    (salesPost) => salesPost.product_id === postToAdd.product_id
  );
  if (existingSalesPost) {
    return [...salesPosts];
  }
  return [...salesPosts, { ...postToAdd }];
};
const removePost = (salesPosts, postToRemove) => {
  return salesPosts.filter(
    (salesPost) => salesPost.product_id !== postToRemove.product_id
  );
};

// Actions
export const AddSalesPost = (salesPosts, postToAdd) => {
  const newPosts = addSalesPost(salesPosts, postToAdd);
  return CreateAction(SalesActionTypes.SET_SALES_POSTS, newPosts);
};

export const RemoveSalesPost = (salesPosts, postToRemove) => {
  const newPosts = removePost(salesPosts, postToRemove);
  return CreateAction(SalesActionTypes.SET_SALES_POSTS, newPosts);
};

export const SetSalesPost = (salesPostsFetched) => {
  return CreateAction(SalesActionTypes.SET_SALES_POSTS, salesPostsFetched);
};
