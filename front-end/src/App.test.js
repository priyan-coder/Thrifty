import { render } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('Checking App rendering', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(App).toBeTruthy();
});
