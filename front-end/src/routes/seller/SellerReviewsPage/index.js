import styled from 'styled-components';
import ReviewCard from '../../../components/ReviewCard';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { allReviews } from '../../../mockData/MockData';
import VerifiedIcon from '@mui/icons-material/Verified';

const SellerReviewsPage = () => {
  // logged in user wants to view the reviews of the chosenUserName
  const { userName, userId } = useParams();

  // each review is an object like {id: "", ratingValue: 0, comment: "", madeByUserName: ""}
  // get the reviews made by other users of the chosenUserName
  const reviewsOfUser = allReviews[userId];
  return (
    <Fragment>
      <Title>
        Reviews of {userName} who posted that product <VerifiedIcon />
      </Title>
      <ReviewsContainer>
        {reviewsOfUser &&
          reviewsOfUser.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
      </ReviewsContainer>
    </Fragment>
  );
};

const ReviewsContainer = styled.div`
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

export default SellerReviewsPage;
