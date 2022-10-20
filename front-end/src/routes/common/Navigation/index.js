import { Outlet, Link } from 'react-router-dom';
import { Fragment } from 'react';
import { ReactComponent as CrwnLogo } from '../../../assets/crown.svg';
import styled from 'styled-components';
// Outlet renders the nested components between the <Route></Route>
// Navigation Bar Persists for all routes -> NavigationContainer
const Navigation = () => {
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/home">
          <CrwnLogo />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/home/fav">Favorites</NavLink>
          <NavLink to="/home/cart">Cart</NavLink>
          <NavLink to="/home/sell">Sell</NavLink>
        </NavLinks>
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
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
`;

export default Navigation;
