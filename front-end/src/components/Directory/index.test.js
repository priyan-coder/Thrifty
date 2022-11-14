import Directory from './index';
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
it('should render Directory component', () => {
  expect(shallow(<Directory categories={[]} />)).toMatchSnapshot();
});
