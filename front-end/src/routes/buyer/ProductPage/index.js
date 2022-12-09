import ProductCard from '../../../components/ProductCard';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
// import { allProducts } from '../../../mockData/MockData';
import { Fragment, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { postData } from '../../../tools/ApiHandler';

const ProductPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const fetchData = async (category) => {
    const endpoint = 'http://localhost:8080/category_search';
    const dataToSend = JSON.stringify({ category });
    const res = await postData(endpoint, dataToSend);
    setProducts(res.response);
  };

  useEffect(() => {
    fetchData(category);
  }, [category]);

  const [searchInput, setSearchInput] = useState('');
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      <SearchBarContainer>
        <TextField
          sx={{ minWidth: '70%' }}
          name="searchInput"
          type="text"
          value={searchInput}
          id="searchInput"
          label="Search from chosen category"
          variant="outlined"
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
      </SearchBarContainer>

      <CategoryContainer>
        {filteredProducts &&
          filteredProducts.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
      </CategoryContainer>
    </Fragment>
  );
};

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

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
