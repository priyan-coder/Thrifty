import ProductCard from '../../../components/ProductCard';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { allProducts } from '../../../mockData/MockData';
import { Fragment } from 'react';
const ProductPage = () => {
  const { category } = useParams();
  const products = allProducts[category];
  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </Fragment>
  );
};

const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;
  margin: 50px;
`;

const Title = styled.h2`
  font-size: 38px;
  margin-bottom: 25px;
  text-align: center;
`;

export default ProductPage;
