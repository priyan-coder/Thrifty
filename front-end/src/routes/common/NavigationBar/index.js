import { Outlet, Link } from 'react-router-dom';
import { Fragment } from 'react';
import { ReactComponent as CrwnLogo } from '../../../assets/crown.svg';
import { useSelector } from 'react-redux';
import CartIcon from '../../../components/CartIcon';
import CartDropdown from '../../../components/CartDropdown';
import { SelectIsCartOpen } from '../../../redux/Cart/CartSelector';
import styled from 'styled-components';
import ReviewBadge from '../../../components/ReviewBadge';

// Outlet renders the nested components between the <Route></Route>
// Navigation Bar Persists for all routes -> NavigationContainer
const NavigationBar = () => {
  const isCartOpen = useSelector(SelectIsCartOpen);
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/home">
          <CrwnLogo />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/home/sell">SELL</NavLink>
          <NavLink to="/home/review">
            <ReviewBadge />
          </NavLink>
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export const NavigationContainer = styled.div`
  height: 90px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  background-color: black;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
`;

export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
  color: white;
`;

export default NavigationBar;
