import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsCMS, addProduct, updateProduct } from '../stores/actions/cms';
import { setLoggedInState } from '../stores/actions/login';
import { showNotificationSnackbar } from '../stores/actions/snackbar';
import { useNavigate } from "react-router-dom";

import { 
  Box, Grid, Typography,
  TextField, MenuItem,
  Button
} from '@mui/material';
import FormAddAdditionalImages from './FormAddAdditionalImages';

export default function FormAddEditProduct({ afterSubmit }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product } = useSelector(state => state.cms);
  const { categories } = useSelector(state => state.categories);

  const [formData, setFormData] = useState({});
  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        categoryId: product.category.id
      })
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        categoryId: '',
        mainImg: ''
      })
    }
  }, []);
  const [images, setImages] = useState([]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleUnauthorizedToken = (err) => {
    if (err.statusCode === 401) {
      localStorage.removeItem('access_token');
      dispatch(setLoggedInState(false));
      navigate('/');
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(images.length);
    const submitData = {
      ...formData,
      images: [...images]
    }
    // console.log("Submitting...", submitData);
    dispatch(product ? updateProduct(submitData) : addProduct(submitData))
      .then(() => {
        dispatch(showNotificationSnackbar({
          type: 'success',
          message: `Successfully ${product ? 'edited' : 'added new'} product`
        }));
      })
      .then(() => dispatch(fetchProductsCMS()))
      .catch((err) => {
        handleUnauthorizedToken(err);
        const errors = err?.response?.data?.errors;
        dispatch(showNotificationSnackbar({
          type: 'error',
          message: errors ? errors[0].message : 'Internal Server Error',
        }));
      });
    afterSubmit();
  };

  return (
    <>
      <Typography variant="h4">{ product ? 'Edit product' : 'Add a new product' }</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField 
              name="name"
              label="Name" 
              type="text"
              margin="none"
              size="small"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              name="description"
              label="Description" 
              margin="none"
              size="small"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              required
              multiline
              minRows="5"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              name="price"
              label="Price"
              type="number"
              margin="none"
              size="small"
              value={formData.price}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              select
              name="categoryId"
              label="Product Category"
              // type="number"
              margin="none"
              size="small"
              value={formData.categoryId || ''}
              onChange={handleInputChange}
              fullWidth
              required
              defaultValue={formData.categoryId || ''}
            >
              {categories.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          
          <Grid item xs={12}>
            <TextField 
              name="mainImg"
              label="Main Image Url"
              type="url"
              margin="none"
              size="small"
              value={formData.mainImg}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <FormAddAdditionalImages 
              imageState={[images, setImages]}
            />
          </Grid>

        </Grid>
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>

      </Box>
    </>
  );

}