import CreateAction from '../Utils/CreateAction';
import CartActionTypes from './CartActionTypes';

const addCartItem = (cartItems, productToAdd) => {
  // The find() method returns the first element in the provided array that satisfies the provided testing function
  // If no values satisfy the testing function, undefined is returned
  console.log(productToAdd.product_id);
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.product_id === productToAdd.product_id
  );

  // The map() method creates a new array
  // populated with the results of calling a provided function
  // on every element in the calling array
  if (existingCartItem) {
    // if the item to add to cart already exists in the cart
    // increase its quantity by 1
    // and return as new cart array
    return cartItems.map((cartItem) =>
      cartItem.product_id === productToAdd.product_id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  // if new item being added to cart
  // add product object to the cart array with its quantity set to 1
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.product_id === cartItemToRemove.product_id
  );

  // if quantity of cartItem to be removed is equal to 1
  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    // The filter() method creates a shallow copy of a portion of a given array,
    // filtered down to just the elements from the given array that pass the test
    // implemented by the provided function
    return cartItems.filter(
      (cartItem) => cartItem.product_id !== cartItemToRemove.product_id
    );
  }

  // if quantity of cartItem to be removed is > 1
  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.product_id === cartItemToRemove.product_id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

// The filter() method creates a shallow copy of a portion of a given array,
// filtered down to just the elements from the given array that pass the test
// implemented by the provided function
const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter(
    (cartItem) => cartItem.product_id !== cartItemToClear.product_id
  );

// Actions
export const AddItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return CreateAction(CartActionTypes.SET_CART_ITEMS, newCartItems);
};

export const RemoveItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return CreateAction(CartActionTypes.SET_CART_ITEMS, newCartItems);
};

export const ClearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return CreateAction(CartActionTypes.SET_CART_ITEMS, newCartItems);
};

export const SetCartEmpty = () => {
  return CreateAction(CartActionTypes.SET_CART_ITEMS, []);
};

export const SetCartItems = (cartItems) => {
  return CreateAction(CartActionTypes.SET_CART_ITEMS, cartItems);
};

export const SetIsCartOpen = (boolean) =>
  CreateAction(CartActionTypes.SET_IS_CART_OPEN, boolean);
