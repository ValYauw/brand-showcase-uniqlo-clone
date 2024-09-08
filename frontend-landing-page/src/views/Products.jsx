import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../stores/actions/products';
import { showNotificationSnackbar } from '../stores/actions/snackbar';

import { 
  Grid, Box, Typography, Container, Pagination 
} from '@mui/material';
import ProductCard from '../components/ProductCard.jsx';
import HeroCard from '../components/HeroCard.jsx';
import Spinner from '../components/Spinner';

export default function Products() {

  const dispatch = useDispatch();

  const [ currentPage, setCurrentPage ] = useState(1);
  const { products, numPages, isLoading } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts(currentPage))
      .catch(err => dispatch(showNotificationSnackbar(
        {type: 'error', message: err.message}
        )));
  }, [currentPage]);

  function navigatePage(e, value) {
    setCurrentPage(value);
    // console.log('Current page: ', currentPage);
  }

  function HeroUnit() {
    return (
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Album layout
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Something short and leading about the collection below—its contents,
            the creator, etc. Make it short and sweet, but not too short so folks
            don&apos;t simply skip over it entirely.
          </Typography>
        </Container>
      </Box>
    )
  }

  function ProductCards() {
    return (
      <>
      <Container
        sx={{ 
          display: {
            md: 'flex',
            xs: 'block'
          }, 
          flexDirection: 'row',
          flexGrow: 1
        }}
      >
        <Box sx={{
          marginRight: {
            md: '20px',
            xs: '0px'
          },
          marginBottom: {
            md: '0px',
            xs: '20px'
          },
          height: 'fit-content'
        }}>
          <HeroCard {...products[0]} />
        </Box>
        <Box>
          <Grid container spacing={4}>
            {products?.map((product, index) => (
              <Grid item key={product?.id} sm={6} md={4}>
                <ProductCard
                  key={index}
                  {...product}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      </>
    )
  }

  function PaginationMenu() {
    return (
      <Box style={{
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'center', 
        marginTop: '20px'
      }}>
        <Pagination 
          count={numPages || 1} page={currentPage} onChange={navigatePage}
          color="primary"
        />
      </Box>
    )
  }

  return (
    <>
      <section>
        <ProductCards />
        <PaginationMenu />
        <Spinner open={isLoading} />
      </section>
    </>
  );
}