import Button from '@mui/material/Button';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import React, { useRef, useState } from 'react';
import { ReactComponent as CrwnLogo } from '../../../assets/crown.svg';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { v4 as uuidv4 } from 'uuid';
import { postData } from '../../../tools/ApiHandler';
import { useNavigate } from 'react-router-dom';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SignUp = () => {
  const defaultFormFields = {
    id: uuidv4(),
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/');
  };

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const [isNameValid, setNameValid] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const displayNameRef = useRef(null);
  const emailRef = useRef(null);
  const pwdRef = useRef(null);

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const emailReg = /\S+@\S+\.\S+/;
    const nameReg = /^[A-Za-z]+$/;
    const { name, value } = event.target;
    if (name.localeCompare('email') === 0) {
      setEmailValid(emailReg.test(value));
    } else if (name.localeCompare('password') === 0) {
      value.length > 5 ? setPasswordValid(true) : setPasswordValid(false);
    } else if (name.localeCompare('displayName') === 0) {
      setNameValid(nameReg.test(value));
    }
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    const { displayName, email, password, confirmPassword } = formFields;
    event.preventDefault();
    if (password !== confirmPassword) {
      handleOpenSnackbar();
      return;
    }
    const endpoint = 'http://localhost:8080/sign_up';
    const dataToSend = JSON.stringify({
      displayName,
      email_id: email,
      password: password
    });
    const resp = await postData(endpoint, dataToSend);
    console.log(resp);
    if (resp.created_new_user) {
      resetFormFields();
      setNameValid(false);
      setEmailValid(false);
      setPasswordValid(false);
      goToLogin();
    } else {
      window.alert('Unable to Sign Up!');
    }
  };

  return (
    <FormContainer>
      <SignUpForm>
        <h2>Create a new Thrifty account</h2>
        <CrwnLogo />
        <TextField
          fullWidth
          required={true}
          name="displayName"
          type="text"
          value={displayName}
          id="displayName"
          label="Name"
          variant="outlined"
          onChange={handleChange}
          inputRef={displayNameRef}
          error={
            document.activeElement === displayNameRef.current && !isNameValid
          }
          helperText={!isNameValid && 'Please enter a valid display name'}
        />
        <TextField
          fullWidth
          required={true}
          name="email"
          type="email"
          value={email}
          id="email"
          label="Email"
          variant="outlined"
          onChange={handleChange}
          inputRef={emailRef}
          error={document.activeElement === emailRef.current && !isEmailValid}
          helperText={!isEmailValid && 'Please enter a valid email'}
        />
        <TextField
          fullWidth
          required={true}
          name="password"
          type="password"
          value={password}
          id="password"
          label="Password"
          variant="outlined"
          onChange={handleChange}
          inputRef={pwdRef}
          error={document.activeElement === pwdRef.current && !isPasswordValid}
          helperText={
            !isPasswordValid &&
            'Please enter a password with at least 6 characters'
          }
        />

        <TextField
          fullWidth
          required={true}
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          id="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          onChange={handleChange}
        />

        <Button
          disabled={!isNameValid || !isEmailValid || !isPasswordValid}
          type="submit"
          variant="contained"
          onClick={handleSubmit}
        >
          Sign up
        </Button>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackBar}
        >
          <Alert
            onClose={handleCloseSnackBar}
            severity="warning"
            sx={{ width: '100%' }}
          >
            Passwords don't match!
          </Alert>
        </Snackbar>
      </SignUpForm>
    </FormContainer>
  );
};

const SignUpForm = styled.div`
  height: 90%;
  width: 50%;
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
  background: linear-gradient(#20a4f3, #182b3a);
  background-repeat: no-repeat;
`;

export default SignUp;
