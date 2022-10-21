import Button from '@mui/material/Button';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { ReactComponent as CrwnLogo } from '../../../assets/crown.svg';
const Login = () => {
  return (
    <FormContainer>
      <LoginForm>
        <h2>Thrifty</h2>
        <CrwnLogo />
        <TextField id="email" label="email" variant="outlined" />
        <TextField id="password" label="password" variant="outlined" />
        <MultipleButtons>
          <Button variant="contained">Login</Button>
          <Button variant="text">Sign Up</Button>
        </MultipleButtons>
      </LoginForm>
    </FormContainer>
  );
};

const MultipleButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 70%;
  overflow: hidden;
`;

const LoginForm = styled.div`
  height: 50%;
  width: 30%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #fff1e1;
  background-color: white;
  position: absolute;
  h2 {
    font-weight: bold;
    margin: 0 6px 0;
  }
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
`;

const FormContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  overflow: hidden;
  background-color: white;
`;
export default Login;
