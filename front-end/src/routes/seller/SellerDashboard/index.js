import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import React, { Fragment } from 'react';
import PostCreation from '../../../components/PostCreation';
import { useSelector } from 'react-redux';
import { SelectSalesPosts } from '../../../redux/Sales/SalesSelector';
import SalesPostCard from '../../../components/SalesPostCard';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';
const SellerDashboard = () => {
  const salesPosts = useSelector(SelectSalesPosts);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Fragment>
      <ModalOpeningButton
        variant="contained"
        color="success"
        onClick={handleOpen}
      >
        Create a new Sales Post
      </ModalOpeningButton>
      <HeaderBlock direction="column" spacing={0.01}>
        <h2>Your Active Previous Sales Posts</h2>
        <hr />
      </HeaderBlock>
      <SalesPostsContainer>
        <Modal open={open} onClose={handleClose}>
          <PostCreationFormBox>
            <PostCreation />
          </PostCreationFormBox>
        </Modal>
        {salesPosts &&
          salesPosts.map((post) => {
            return <SalesPostCard key={post.product_id} product={post} />;
          })}
      </SalesPostsContainer>
    </Fragment>
  );
};

const ModalOpeningButton = styled(Button)`
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
`;

const SalesPostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;
  margin: 50px;
`;

const PostCreationFormBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 20px;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 90%;
  background-color: white;
  border: 2px solid #000;
  box-shadow: 24;
  border-radius: 10px;
`;
const HeaderBlock = styled(Stack)`
  margin: 20px;
`;

export default SellerDashboard;
