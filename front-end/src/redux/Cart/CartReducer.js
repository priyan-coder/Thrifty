import CartActionTypes from './CartActionTypes';

const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: []
};

const CartReducer = (state = CART_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CartActionTypes.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload
      };
    case CartActionTypes.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      };
    default:
      return state;
  }
};

export default CartReducer;
