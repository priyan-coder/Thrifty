import Home from './routes/common/Home';
import Navigation from './routes/common/Navigation';
import CartPage from './routes/buyer/CartPage';
import FavoritesPage from './routes/buyer/FavoritesPage';
import SellerDashboard from './routes/seller/SellerDashboard';
import { Routes, Route } from 'react-router-dom';
import Login from './routes/common/Login';
import SignUp from './routes/common/SignUp';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Navigation />}>
        <Route index={true} element={<Home />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="fav" element={<FavoritesPage />} />
        <Route path="sell" element={<SellerDashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
