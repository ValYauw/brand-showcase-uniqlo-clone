import { useState, useEffect } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchProductsCMS, getProductById, deleteProduct, releaseProductFromStore
} from '../stores/actions/cms';
import { fetchCategories } from '../stores/actions/categories';
import { setLoggedInState } from '../stores/actions/login';
import { showNotificationSnackbar } from '../stores/actions/snackbar';
import { useNavigate } from "react-router-dom";

import { 
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell, 
  Box, Paper, Button,
  Dialog, DialogContent, DialogContentText, DialogActions
} from '@mui/material';
import TableRowProduct from "../components/TableRowProduct";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import FormAddEditProduct from "../components/FormAddEditProduct";
import Spinner from "../components/Spinner";

export default function CMS() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUnauthorizedToken = (err) => {
    if (err.statusCode === 401) {
      localStorage.removeItem('access_token');
      dispatch(setLoggedInState(false));
      navigate('/login');
    }
  }

  useEffect(() => {
    dispatch(fetchProductsCMS())
      .catch(err => {
        handleUnauthorizedToken(err);
        const errors = err?.response?.data?.errors;
        dispatch(showNotificationSnackbar({
          type: 'error',
          message: errors ? errors[0].message : 'Internal Server Error',
        }));
      })
      
    dispatch(fetchCategories())
      .catch(err => {
        const errors = err?.response?.data?.errors;
        dispatch(showNotificationSnackbar({
          type: 'error',
          message: errors ? errors[0].message : 'Internal Server Error',
        }));
      });
  }, []);
  const { products, isLoading } = useSelector(state => state.cms);
  // const navigate = useNavigate();

  const [openProductForm, setOpenProductForm] = useState(false);
  const handleShowAddProductForm = () => {
    dispatch(releaseProductFromStore());
    setOpenProductForm(true);
    // navigate('/cms/products/add');
  }
  const handleShowEditProductForm = (id) => () => {
    dispatch(getProductById(id))
      .then(() => setOpenProductForm(true))
      .catch(err => dispatch(showNotificationSnackbar(
        {type: 'error', message: err.message}
        )));
    // navigate('/cms/products/edit');
  }
  const handleCloseProductForm = () => {
    setOpenProductForm(false);
  }

  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const handleOpenConfirmationDialog = (id) => () => {
    setDeleteId(id);
    setOpenConfirmationDialog(true);
  }
  const handleCloseConfirmationDialog = () => {
    setDeleteId(null);
    setOpenConfirmationDialog(false);
  }
  const handleDeleteProduct = () => {
    dispatch(deleteProduct(deleteId))
      .then(() => {
        dispatch(fetchProductsCMS())
          .catch(err => {
            handleUnauthorizedToken(err);
            const errors = err?.response?.data?.errors;
            dispatch(showNotificationSnackbar({
              type: 'error',
              message: errors ? errors[0].message : 'Internal Server Error',
            }));
          })
        dispatch(showNotificationSnackbar(
          {type: 'success', message: 'Successfully deleted'}
        ))
      })
      .catch(err => {
        const errors = err?.response?.data?.errors;
        dispatch(showNotificationSnackbar({
          type: 'error',
          message: errors ? errors[0].message : 'Internal Server Error',
        }));
      });
    setDeleteId(null);
    setOpenConfirmationDialog(false);
    dispatch(fetchProductsCMS())
  }

  function AddProductButton() {
    return (
      <Box align="right" sx={{marginBottom:"20px"}}>
        <Button variant="contained" size="large" onClick={handleShowAddProductForm}>
          <AddBoxOutlinedIcon />Add New Product
        </Button>
      </Box>
    )
  }

  function CMSTableHead() {
    return (
      <TableHead sx={{ backgroundColor: 'grey', minHeight: '80px' }} >
        <TableRow>
          <TableCell>No</TableCell>
          <TableCell>Image</TableCell>
          <TableCell>Name & description</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Author</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
    )
  }

  function DialogProduct({ open, onClose }) {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        scroll="body"
      >
        <DialogContent>
          <FormAddEditProduct
            afterSubmit={() => {
              setOpenProductForm(false);
            }}
          />
        </DialogContent>
      </Dialog>
    )
  }

  function DialogConfirmDelete({ open, onClose }) {
    return (
      <Dialog
        open={open}
        onClose={onClose}
      >
        <DialogContent>
          <DialogContentText>
            This will delete the selected product and all associated images from the database.<br />
            Are you sure you want to continue?
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleCloseConfirmationDialog}>
              Cancel
              </Button>
            <Button onClick={handleDeleteProduct}>
              Delete Product
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <>
      <AddProductButton />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <CMSTableHead />
          <TableBody>
            {products?.map((product, index) => (
              <TableRowProduct 
                key={product.id}
                index={index}
                {...product}
                onClickEditButton={handleShowEditProductForm}
                onClickDeleteButton={handleOpenConfirmationDialog}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DialogProduct 
        open={openProductForm}
        onClose={handleCloseProductForm}
      />

      <DialogConfirmDelete
        open={openConfirmationDialog}
        onClose={handleCloseConfirmationDialog}
      />

      <Spinner open={isLoading} />

    </>
  )
}