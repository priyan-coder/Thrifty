import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Login from './index';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

configure({ adapter: new Adapter() });
describe('Login component', () => {
  const defaultFormFields = {
    email: '',
    password: '',
  };
  const mockStore = configureStore();
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(defaultFormFields);
    wrapper = shallow(
      <Provider store={store}>
        <Login />
      </Provider>
    );
  });

  it('should render Login component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
