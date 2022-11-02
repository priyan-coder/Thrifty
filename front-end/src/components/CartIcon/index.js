import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  SelectCartCount,
  SelectIsCartOpen
} from '../../redux/Cart/CartSelector';
import { SetIsCartOpen } from '../../redux/Cart/CartAction';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(SelectIsCartOpen);
  const cartCount = useSelector(SelectCartCount);
  const toggleIsCartOpen = () => dispatch(SetIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export const CartIconContainer = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  svg {
    width: 24px;
    height: 24px;
  }
`;

export const ItemCount = styled.span`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  bottom: 12px;
`;

export default CartIcon;
