import EachCategory from '../EachCategory';
import styled from 'styled-components';

const DisplayContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const DisplayCategories = ({ categories }) => {
  return (
    <DisplayContainer>
      {categories.map(({ id, title, imageUrl }) => (
        <EachCategory key={id} title={title} imageUrl={imageUrl} />
      ))}
    </DisplayContainer>
  );
};

export default DisplayCategories;
