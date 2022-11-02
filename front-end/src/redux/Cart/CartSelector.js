import { createSelector } from 'reselect';

const SelectCartReducer = (state) => state.cart;

export const SelectIsCartOpen = createSelector(
  [SelectCartReducer],
  (cart) => cart.isCartOpen
);

export const SelectCartItems = createSelector(
  [SelectCartReducer],
  (cart) => cart.cartItems
);

// The reduce() method executes a user-supplied "reducer" callback function on each element of the array,
// in order, passing in the return value from the calculation on the preceding element.
// The final result of running the reducer across all elements of the array is a single value.
// Perhaps the easiest-to-understand case for reduce() is to return the sum of all the elements in an array
// gets the total value of all products in the cartItems array
export const SelectCartTotal = createSelector([SelectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);

// gets the total number of products or quantity in the cartItems array
export const SelectCartCount = createSelector([SelectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);
