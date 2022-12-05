import CheckoutReviewCard from '../../../components/CheckoutReviewCard';
import { SelectReviewsTodo } from '../../../redux/Reviews/ReviewsSelector';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';
import styled from 'styled-components';

const CheckoutReviewsPage = () => {
  const reviewsTodo = useSelector(SelectReviewsTodo);
  return (
    <Fragment>
      <Title>Leave some reviews for your previous sellers.</Title>
      <PendingReviewsContainer>
        {reviewsTodo.map((productForWhichReviewIsInTodo) => (
          <CheckoutReviewCard
            key={productForWhichReviewIsInTodo.id}
            productReviewTodo={productForWhichReviewIsInTodo}
          />
        ))}
      </PendingReviewsContainer>
    </Fragment>
  );
};

const Title = styled.h2`
  font-size: 38px;
  margin-bottom: 25px;
  text-align: center;
`;

const PendingReviewsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;
  margin: 50px;
`;

export default CheckoutReviewsPage;
