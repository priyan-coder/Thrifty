import CartItem from './index';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });
it('should render CartItem component', () => {
  const mockItem = {
    imageUrl: 'www.testImage.com',
    price: 10,
    name: 'hats',
    quantity: 2,
  };

  expect(shallow(<CartItem cartItem={mockItem} />)).toMatchSnapshot();
});
