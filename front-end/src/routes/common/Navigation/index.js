import { Outlet, Link } from 'react-router-dom';
import { Fragment } from 'react';
import { ReactComponent as CrwnLogo } from '../../../assets/crown.svg';
// Outlet renders the nested components between the <Route></Route>
// Navigation Bar Persists for all routes
const Navigation = () => {
  return (
    <Fragment>
      <div>
        <Link to="/">
          <CrwnLogo />
        </Link>
        <div>
          <Link to="/fav">Favorites</Link>
          <Link to="/cart">Cart</Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
