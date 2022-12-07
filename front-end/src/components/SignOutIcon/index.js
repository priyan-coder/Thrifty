import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import SetCurrentUser from '../../redux/User/UserAction';
const SignOutIcon = () => {
  const dispatch = useDispatch();

  const logOutUser = () => {
    dispatch(SetCurrentUser(null));
  };
  return (
    <div onClick={logOutUser}>
      <LogoutIcon fontSize="large" />
    </div>
  );
};

export default SignOutIcon;
