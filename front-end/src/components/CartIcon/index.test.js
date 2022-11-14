import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import CartIcon from './index';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
configure({ adapter: new Adapter() });
describe('CartIcon component', () => {
  let wrapper;
  let store;
  const mockStore = configureStore();
  const initialState = {
    isCartOpen: false,
    cartItems: [],
  };

  beforeEach(() => {
    store = mockStore({ cart: { ...initialState } });
    wrapper = shallow(
      <Provider store={store}>
        <CartIcon />
      </Provider>
    );
  });

  it('should render CartIcon component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
