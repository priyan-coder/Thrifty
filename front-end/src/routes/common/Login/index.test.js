import { render } from '@testing-library/react';
import App from '../../../App';
import Login from './index';
import { BrowserRouter } from 'react-router-dom';

test('Checking App rendering', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(Login).toBeDefined();
});
