import Badge from '@mui/material/Badge';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useSelector } from 'react-redux';
import { SelectReviewsTodoLength } from '../../redux/Reviews/ReviewsSelector';
const ReviewBadge = () => {
  const numOfReviews = useSelector(SelectReviewsTodoLength);
  return (
    <Badge badgeContent={numOfReviews}>
      <NotificationsActiveIcon color="warning" fontSize="large" />
    </Badge>
  );
};

export default ReviewBadge;
