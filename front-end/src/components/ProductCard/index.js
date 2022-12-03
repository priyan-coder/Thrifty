import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { SelectCartItems } from '../../redux/Cart/CartSelector';
import { AddItemToCart } from '../../redux/Cart/CartAction';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import ReviewsRoundedIcon from '@mui/icons-material/ReviewsRounded';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl, userName, userId } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(SelectCartItems);
  const navigate = useNavigate();
  const onNavigateHandler = () => navigate(`${userName}/${userId}`);
  const addProductToCart = () => dispatch(AddItemToCart(cartItems, product));

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
        <ReviewIcon
          fontSize="large"
          color="secondary"
          onClick={onNavigateHandler}
        >
          Reviews
        </ReviewIcon>
      </Footer>
      <Button color="success" variant="contained" onClick={addProductToCart}>
        Add to cart
      </Button>
    </ProductCartContainer>
  );
};

const ProductCartContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 30px;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;
  img {
    width: 100%;
    height: 70%;
    object-fit: cover;
    margin-bottom: 10px;
  }
  button {
    width: 80%;
    opacity: 0.7;
    top: 120px;
    position: absolute;
    display: none;
  }
  &:hover {
    img {
      opacity: 0.8;
    }
    button {
      opacity: 0.85;
      display: flex;
    }
  }
`;

const Footer = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  font-size: 14.5px;
`;

const Name = styled.span`
  width: 60%;
  margin-bottom: 15px;
`;

const Price = styled.span`
  width: 20%;
  margin-bottom: 15px;
`;

const ReviewIcon = styled(ReviewsRoundedIcon)`
  width: 10%;
  margin-bottom: 15px;
`;

export default ProductCard;
