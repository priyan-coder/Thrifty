import styled from 'styled-components';
import Button from '@mui/material/Button';
import { RemoveSalesPost } from '../../redux/Sales/SalesAction';
import { useDispatch, useSelector } from 'react-redux';
import { SelectSalesPosts } from '../../redux/Sales/SalesSelector';
const SalesPostCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const salesPosts = useSelector(SelectSalesPosts);
  const dispatch = useDispatch();
  const removePdtHandler = () => {
    dispatch(RemoveSalesPost(salesPosts, product));
  };
  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button color="error" variant="contained" onClick={removePdtHandler}>
        Delete Post
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
    height: 95%;
    object-fit: cover;
    margin-bottom: 5px;
  }
  button {
    width: 80%;
    opacity: 0.7;
    position: absolute;
    top: 255px;
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
  width: 70%;
  height: 5%;
  display: flex;
  justify-content: space-around;
  font-size: 16px;
`;

const Name = styled.span`
  width: 90%;
  margin-bottom: 15px;
`;

const Price = styled.span`
  width: 10%;
`;

export default SalesPostCard;
