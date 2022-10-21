import Button from '@mui/material/Button';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import React, { useRef, useState } from 'react';
import { ReactComponent as CrwnLogo } from '../../../assets/crown.svg';

const Login = () => {
  const defaultFormFields = {
    email: '',
    password: ''
  };
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const [isEmailValid, setEmailValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const emailRef = useRef(null);
  const pwdRef = useRef(null);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const reg = /\S+@\S+\.\S+/;
    const { name, value } = event.target;
    if (name.localeCompare('email') === 0) {
      setEmailValid(reg.test(value));
    } else {
      value.length > 5 ? setPasswordValid(true) : setPasswordValid(false);
    }
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formFields);
    resetFormFields();
    setEmailValid(false);
    setPasswordValid(false);
  };
  return (
    <FormContainer>
      <LoginForm>
        <h2>Thrifty</h2>
        <CrwnLogo />
        <TextField
          fullWidth
          required={true}
          name="email"
          type="email"
          value={email}
          id="email"
          label="email"
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
          label="password"
          variant="outlined"
          onChange={handleChange}
          inputRef={pwdRef}
          error={document.activeElement === pwdRef.current && !isPasswordValid}
          helperText={
            !isPasswordValid &&
            'Please enter a password with at least 6 characters'
          }
        />
        <MultipleButtons>
          <Button
            disabled={!isEmailValid || !isPasswordValid}
            type="submit"
            variant="contained"
            onClick={handleSubmit}
          >
            Login
          </Button>
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
  height: 60%;
  width: 40%;
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
  background: radial-gradient(#fceabb, #f8b500);
  background-repeat: no-repeat;
`;
export default Login;
