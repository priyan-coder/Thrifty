import Button from '@mui/material/Button';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { ReactComponent as CrwnLogo } from '../../../assets/crown.svg';
const Login = () => {
  return (
    <FormContainer>
      <LoginForm>
        <h2>Login</h2>
        <CrwnLogo />
        <TextField id="email" label="email" variant="outlined" />
        <TextField id="password" label="password" variant="outlined" />
        <Button variant="contained">Login</Button>
      </LoginForm>
    </FormContainer>
  );
};

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
    text-transform: uppercase;
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
