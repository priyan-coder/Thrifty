import Home from './routes/common/Home';
import NavigationBar from './routes/common/NavigationBar';
import SellerDashboard from './routes/seller/SellerDashboard';
import Login from './routes/common/Login';
import SignUp from './routes/common/SignUp';
import Checkout from './routes/buyer/Checkout';
import ProductPage from './routes/buyer/ProductPage';
import SellerReviewsPage from './routes/seller/SellerReviewsPage';
import CheckoutReviewsPage from './routes/buyer/CheckoutReviewsPage';
import { Routes, Route } from 'react-router-dom';
import { SelectCurrentUser } from './redux/User/UserSelector';
import { useSelector } from 'react-redux';
const App = () => {
  const currentUser = useSelector(SelectCurrentUser);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      {currentUser && (
        <Route path="/home" element={<NavigationBar />}>
          <Route index={true} element={<Home />} />
          <Route path="sell" element={<SellerDashboard />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="review" element={<CheckoutReviewsPage />} />
          <Route path="shop/:category" element={<ProductPage />} />
          <Route
            path="shop/:category/:userName/:userId"
            element={<SellerReviewsPage />}
          />
        </Route>
      )}
      <Route
        path="*"
        element={
          <div>
            <h1>Page Not Found</h1>
          </div>
        }
      />
    </Routes>
  );
};

export default App;
