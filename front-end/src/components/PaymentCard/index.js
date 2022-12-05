import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { SelectCartItems } from '../../redux/Cart/CartSelector';
import { useSelector, useDispatch } from 'react-redux';
import { AddReviewsToReviewsToDo } from '../../redux/Reviews/ReviewsAction';
import { SelectReviewsTodo } from '../../redux/Reviews/ReviewsSelector';
import { SetCartEmpty } from '../../redux/Cart/CartAction';
const PaymentCard = () => {
  const dispatch = useDispatch();
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const defaultFields = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: ''
  };

  const cartItems = useSelector(SelectCartItems);
  const reviewsTodo = useSelector(SelectReviewsTodo);
  const checkLuhn = (val) => {
    var sum = 0;
    for (var i = 0; i < val.length; i++) {
      var intVal = parseInt(val.substr(i, 1));
      if (i % 2 === 0) {
        intVal *= 2;
        if (intVal > 9) {
          intVal = 1 + (intVal % 10);
        }
      }
      sum += intVal;
    }
    return sum % 10 === 0;
  };

  const validateCardNo = (cardNo) => {
    var regex = new RegExp('^[0-9]{16}$');
    if (!regex.test(cardNo)) return false;
    return checkLuhn(cardNo);
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(defaultFields);
  const [isCardNameValid, setCardNameValid] = useState(false);
  const [isExpiryDateValid, setExpiryDateValid] = useState(false);
  const [isCVCValid, setCVCValid] = useState(false);
  const [isCardNumberValid, setCardNumberValid] = useState(false);
  const cardNameRef = useRef(null);
  const cardNumberRef = useRef(null);
  const cvcRef = useRef(null);
  const expiryDateRef = useRef(null);
  const { cvc, expiry, focus, name, number } = paymentDetails;

  const resetFields = () => {
    setPaymentDetails(defaultFields);
  };

  const handleInputFocus = (e) => {
    setPaymentDetails({ ...paymentDetails, focus: e.target.name });
  };

  const handleInputChange = (e) => {
    const nameReg = /^[A-Za-z]+$/;
    const cvcReg = /^[0-9]{3,4}$/;
    const expiryReg = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
    if (name.localeCompare('number') === 0) {
      setCardNumberValid(validateCardNo(value));
    } else if (name.localeCompare('name') === 0) {
      setCardNameValid(nameReg.test(value));
    } else if (name.localeCompare('cvc') === 0) {
      setCVCValid(cvcReg.test(value));
    } else {
      setExpiryDateValid(expiryReg.test(value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleOpenSnackbar();
    resetFields();
    setCardNameValid(false);
    setExpiryDateValid(false);
    setCVCValid(false);
    setCardNumberValid(false);
    dispatch(AddReviewsToReviewsToDo(reviewsTodo, cartItems));
    dispatch(SetCartEmpty());
  };

  return (
    <Box sx={{ m: 10 }}>
      {cartItems.length > 0 && (
        <Stack direction="column" spacing={2}>
          <Cards
            cvc={cvc}
            expiry={expiry}
            focused={focus}
            name={name}
            number={number}
          />

          <TextField
            type="tel"
            name="number"
            id="number"
            value={number}
            placeholder="Card Number"
            required
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            inputRef={cardNumberRef}
            error={
              document.activeElement === cardNumberRef.current &&
              !isCardNumberValid
            }
            helperText={
              !isCardNumberValid && 'Please enter a valid credit card number!'
            }
          />
          <TextField
            type="text"
            name="name"
            id="name"
            value={name}
            placeholder="Name"
            required
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            inputRef={cardNameRef}
            error={
              document.activeElement === cardNameRef.current && !isCardNameValid
            }
            helperText={!isCardNameValid && 'Please enter a valid name!'}
          />

          <Stack spacing={2} direction="row">
            <TextField
              type="tel"
              name="expiry"
              id="expiry"
              value={expiry}
              placeholder="Valid Thru"
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              inputRef={expiryDateRef}
              error={
                document.activeElement === expiryDateRef.current &&
                !isExpiryDateValid
              }
              helperText={
                !isExpiryDateValid && 'Please enter a valid expiry date!'
              }
            />
            <TextField
              type="tel"
              name="cvc"
              id="cvc"
              value={cvc}
              placeholder="CVC"
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              inputRef={cvcRef}
              error={document.activeElement === cvcRef.current && !isCVCValid}
              helperText={!isCVCValid && 'Please enter a valid CVC!'}
            />
          </Stack>

          <Button
            disabled={
              !isCardNameValid ||
              !isExpiryDateValid ||
              !isCVCValid ||
              !isCardNumberValid
            }
            type="submit"
            variant="contained"
            onClick={handleSubmit}
          >
            Make Payment
          </Button>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackBar}
          >
            <Alert
              onClose={handleCloseSnackBar}
              severity="success"
              sx={{ width: '100%' }}
            >
              Payment Confirmed
            </Alert>
          </Snackbar>
        </Stack>
      )}
    </Box>
  );
};

export default PaymentCard;
