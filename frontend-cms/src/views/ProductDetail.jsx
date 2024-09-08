import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../stores/actions/cms';
import { showNotificationSnackbar } from '../stores/actions/snackbar';

import { useParams } from "react-router-dom";

import { 
  Button, 
  TextField, Link, Box, Grid, Typography, Container,
  Paper
} from '@mui/material';
import ImageCarousel from "../components/ImageCarousel";
import Spinner from '../components/Spinner';

import formatAsRupiah from "../helpers/currencyFormatter";

export default function ProductDetail() {

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductById(id))
      .catch(err => {
        const errors = err?.response?.data?.errors;
        dispatch(showNotificationSnackbar({
          type: 'error',
          message: errors ? errors[0].message : 'Internal Server Error',
        }));
      });
  }, []);

  const { product, isLoading } = useSelector(state => state.product);

  function DetailPage() {
    if (isLoading) {
      return null;
    } else if (!product) {
      return (
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h2" variant="h4">
            404: Data Not Found
          </Typography>
          <Typography paragraph>
            Sorry, we couldn't find this product.
          </Typography>
        </Box>
      )
    } else {

      const { id, name, description, price, mainImg, category, author, images } = product;
      const carouselImages = product ? [mainImg, ...images.map(el => el.imgUrl)] : [];

      return (
        <>

        <Container 
          sx={{ 
            display: {
              md: 'flex', 
              xs: 'block'
            },
            flexDirection: {
              md: 'row'
            }
          }}
        >

          <ImageCarousel 
            images={carouselImages} 
            productName={name}
          />

          <Box sx={{ flexShrink: 1, paddingLeft: { md: '20px', xs: '0px' } }}>
            <Typography component="h2" variant="h4" className="product-card-name">
              {name}
            </Typography>

            <Typography component="h3" variant="h5" className="product-card-price">
              {formatAsRupiah(price)}
            </Typography>

            <Typography 
              paragraph 
              className="product-card-description"
              sx={{ marginTop: '20px' }}
            >
              {description}
            </Typography>
          </Box>

        </Container>
        </>
      )
    }
  }

  return (
    <section>

      <DetailPage />     

      <Spinner open={isLoading} />

    </section>
  );
}