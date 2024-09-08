import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProductBySlug } from '../stores/actions/products';
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

  const { slug } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductBySlug(slug))
      .catch(err => dispatch(showNotificationSnackbar(
        {type: 'error', message: err.message}
        )));
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