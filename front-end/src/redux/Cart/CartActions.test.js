import CartActionTypes from './CartActionTypes';
import { AddItemToCart, SetIsCartOpen } from './CartAction';

describe('toggleCartHidden action', () => {
  it('should create the toggleHidden action', () => {
    expect(SetIsCartOpen(false).type).toEqual(CartActionTypes.SET_IS_CART_OPEN);
  });
});

describe('addItem action', () => {
  it('should create the addItem action', () => {
    const mockItem = {
      id: 1,
      quantity: 1,
    };

    const action = AddItemToCart([], mockItem);
    expect(action.type).toEqual(CartActionTypes.SET_CART_ITEMS);
    expect(action.payload).toEqual([mockItem]);
  });
});
