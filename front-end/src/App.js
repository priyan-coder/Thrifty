import Home from './routes/common/Home';
import Navigation from './routes/common/Navigation';
import CartPage from './routes/buyer/CartPage';
import FavoritesPage from './routes/buyer/FavoritesPage';
import { Routes, Route } from 'react-router-dom';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index={true} element={<Home />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="fav" element={<FavoritesPage />} />
      </Route>
    </Routes>
  );
};

export default App;
