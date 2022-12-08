import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { SelectCurrentUser } from '../../redux/User/UserSelector';
import TextField from '@mui/material/TextField';
import CardActions from '@mui/material/CardActions';
import SendIcon from '@mui/icons-material/Send';
import { MarkReviewAsDone } from '../../redux/Reviews/ReviewsAction';
import { SelectReviewsTodo } from '../../redux/Reviews/ReviewsSelector';
import { useState } from 'react';
import { postData } from '../../tools/ApiHandler';

// review to be done by current User based on the products he made a payment for
const CheckoutReviewCard = ({ productReviewTodo }) => {
  const dispatch = useDispatch();
  const { name, userName, userId } = productReviewTodo;
  const currentUser = useSelector(SelectCurrentUser);
  const prevReviewsToDo = useSelector(SelectReviewsTodo);
  const defaultReviewFormFields = {
    userIdOfReviewRecipient: userId,
    id: uuidv4(),
    ratingValue: 2,
    comment: '',
    madeByUserName: currentUser.displayName,
    madeByUserId: currentUser.id
  };

  const [completedReview, setCompletedReview] = useState(
    defaultReviewFormFields
  );
  const { ratingValue, comment } = completedReview;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      userIdOfReviewRecipient,
      id,
      ratingValue,
      comment,
      madeByUserName,
      madeByUserId
    } = completedReview;

    const dataToSend = JSON.stringify({
      sellerId: userIdOfReviewRecipient,
      reviewId: id,
      ratingValue,
      comment,
      userName: madeByUserName,
      User_id: madeByUserId
    });

    console.log(completedReview);
    const endpoint = 'http://localhost:8080/update_reviews';
    const res = await postData(endpoint, dataToSend);
    console.log(res);
    dispatch(MarkReviewAsDone(prevReviewsToDo, productReviewTodo));
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <p>Review for: {userName}</p>
        <p>
          You purchased {name} from {userName}.
        </p>
        <Rating
          name="rating"
          value={ratingValue}
          onChange={(event, newValue) => {
            setCompletedReview({ ...completedReview, ratingValue: newValue });
          }}
        />
        <TextField
          multiline
          name="comment"
          type="text"
          value={comment}
          id="comment"
          label="Leave a Comment"
          variant="outlined"
          onChange={(e) => {
            setCompletedReview({
              ...completedReview,
              comment: e.target.value
            });
          }}
        />
      </CardContent>
      <CardActions>
        <SendIcon onClick={handleSubmit} />
      </CardActions>
    </Card>
  );
};

export default CheckoutReviewCard;
