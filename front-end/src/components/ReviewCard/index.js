import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';

// readOnly card of a review made by another user about chosen user
const ReviewCard = ({ review }) => {
  const { ratingValue, comment, madeByUserName } = review;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <p>Review by: {madeByUserName}</p>
        <Rating readOnly name="rating" value={ratingValue} />
        <p>{comment}</p>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
