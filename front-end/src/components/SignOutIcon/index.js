import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import SetCurrentUser from '../../redux/User/UserAction';
import { SelectReviewsTodo } from '../../redux/Reviews/ReviewsSelector';
import { SelectCartItems } from '../../redux/Cart/CartSelector';
import { SelectCurrentUser } from '../../redux/User/UserSelector';
import { postData } from '../../tools/ApiHandler';
const SignOutIcon = () => {
  const dispatch = useDispatch();
  const reviewsTodo = useSelector(SelectReviewsTodo);
  const cartItems = useSelector(SelectCartItems);
  const currentUser = useSelector(SelectCurrentUser);

  const logOutUser = async () => {
    const dataToSend = JSON.stringify({
      User_id: currentUser.User_id,
      cartItems: cartItems,
      reviewsToDo: reviewsTodo
    });
    const endpoint = 'http://localhost:8080/update_user_state';
    const res = await postData(endpoint, dataToSend);
    console.log(res);
    dispatch();
    dispatch(SetCurrentUser(null));
  };

  return (
    <div onClick={logOutUser}>
      <LogoutIcon fontSize="large" />
    </div>
  );
};

export default SignOutIcon;
