import Home from './routes/common/Home';
import NavigationBar from './routes/common/NavigationBar';
import SellerDashboard from './routes/seller/SellerDashboard';
import Login from './routes/common/Login';
import SignUp from './routes/common/SignUp';
import Checkout from './routes/buyer/Checkout';
import ProductPage from './routes/buyer/ProductPage';
import SellerReviewsPage from './routes/seller/SellerReviewsPage';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<NavigationBar />}>
        <Route index={true} element={<Home />} />
        <Route path="sell" element={<SellerDashboard />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="shop/:category" element={<ProductPage />} />
        <Route
          path="shop/:category/:userName/:userId"
          element={<SellerReviewsPage />}
        />
      </Route>
    </Routes>
  );
};

export default App;
