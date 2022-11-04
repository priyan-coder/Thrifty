import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { Fragment, useState, useRef } from 'react';
import { AddSalesPost } from '../../redux/Sales/SalesAction';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import { SelectSalesPosts } from '../../redux/Sales/SalesSelector';
import { v4 as uuidv4 } from 'uuid';
import Stack from '@mui/material/Stack';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
const PostCreation = () => {
  const categoryOptions = ['jewelery', 'electronics', 'men', 'women'];
  // dispatch passes the action object to the root reducer which inturn sends the action
  // object to ever single reducer function
  const dispatch = useDispatch();
  const salesPosts = useSelector(SelectSalesPosts);
  const defaultFormFields = {
    name: '',
    description: '',
    price: '',
    quantity: '',
    imageUrl: '',
    category: '',
    id: uuidv4()
  };
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, description, price, quantity, imageUrl, category } = formFields;
  const [isNameValid, setNameValid] = useState(false);
  const [isUrlValid, setUrlValid] = useState(false);
  const [isPriceValid, setPriceValid] = useState(false);
  const [isQuantityValid, setQuantityValid] = useState(false);
  const nameRef = useRef(name);
  const urlRef = useRef(null);
  const priceRef = useRef(null);
  const quantityRef = useRef(null);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const checkPrice = /(\d+\.\d{1,2})/g;
    const checkQuantity = /^[1-9][0-9]*$/;
    const checkUrl = (urlString) => {
      let url;
      try {
        url = new URL(urlString);
      } catch (e) {
        return false;
      }
      return url.protocol === 'http:' || url.protocol === 'https:';
    };
    const { name, value } = event.target;
    if (name.localeCompare('name') === 0) {
      value.length > 5 ? setNameValid(true) : setNameValid(false);
    } else if (name.localeCompare('imageUrl') === 0) {
      setUrlValid(checkUrl(value));
    } else if (name.localeCompare('quantity') === 0) {
      setQuantityValid(checkQuantity.test(value));
    } else if (name.localeCompare('price') === 0) {
      setPriceValid(checkPrice.test(value));
    }
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(AddSalesPost(salesPosts, formFields));
    resetFormFields();
  };
  return (
    <Fragment>
      <h2>Add a new Post</h2>
      <ControlPointIcon />
      <TextField
        error={document.activeElement === nameRef.current && !isNameValid}
        helperText={
          !isNameValid && 'Please enter a product name longer than 5 characters'
        }
        inputRef={nameRef}
        fullWidth
        multiline
        required={true}
        name="name"
        value={name}
        id="name"
        label="Product Name"
        variant="outlined"
        onChange={handleChange}
      />
      <TextField
        fullWidth
        multiline
        name="description"
        value={description}
        id="description"
        label="Product Description"
        variant="outlined"
        onChange={handleChange}
      />

      <Stack direction="row" spacing={2}>
        <TextField
          placeholder="0.00"
          error={document.activeElement === priceRef.current && !isPriceValid}
          helperText={!isPriceValid && 'Please enter a valid number'}
          inputRef={priceRef}
          required={true}
          name="price"
          value={price}
          id="price"
          label="Price"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          error={
            document.activeElement === quantityRef.current && !isQuantityValid
          }
          helperText={!isQuantityValid && 'Please enter a valid number'}
          placeholder="1"
          inputRef={quantityRef}
          required={true}
          name="quantity"
          value={quantity}
          id="quantity"
          label="Quantity"
          variant="outlined"
          onChange={handleChange}
        />
      </Stack>

      <TextField
        error={document.activeElement === urlRef.current && !isUrlValid}
        helperText={!isUrlValid && 'Please enter a valid URL'}
        inputRef={urlRef}
        fullWidth
        multiline
        placeholder="https://www.google.com"
        required={true}
        name="imageUrl"
        value={imageUrl}
        id="imageUrl"
        label="Image Url"
        variant="outlined"
        onChange={handleChange}
      />
      <Autocomplete
        inputValue={category}
        name="category"
        fullWidth
        onInputChange={(event, newInputValue) => {
          setFormFields({ ...formFields, category: newInputValue });
        }}
        id="category"
        options={categoryOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Category"
            required={category.length === 0}
          />
        )}
      />
      <Button
        disabled={
          !isNameValid ||
          !isUrlValid ||
          !isQuantityValid ||
          !isPriceValid ||
          category.length === 0
        }
        type="submit"
        variant="contained"
        onClick={handleSubmit}
      >
        Submit Post
      </Button>
    </Fragment>
  );
};

export default PostCreation;

//background: radial-gradient(#fceabb, #f8b500);
