import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_PRODUCTS } from '../config/queries';

import { FlatList, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import HeroCard from '../components/HeroCard';
import ProductCard from "../components/ProductCard";

import Loader from '../components/Loader';
import ErrorScreen from '../components/ErrorScreen';

// import Header from '../components/Header';

export default function Products({ navigation }) {

  const [ products, setProducts ] = useState([]);
  const [ count, setCount ] = useState(0);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ retrievedAllProducts, setRetrievedAllProducts ] = useState(false);
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: {
      page: currentPage
    }
  });
  useEffect(() => {
    const addProducts = data?.products?.data;
    if (addProducts) {
      setProducts([...products, ...addProducts]);
      setCount(data?.products?.count || 0);
      setRetrievedAllProducts(products.length + addProducts.length >= data?.products?.count);
    }
  }, [data]);

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <ErrorScreen message={error.message} />
  }

  function ViewMoreButton() {
    if (retrievedAllProducts) {
      return null;
    } else {
      return (
        <Button 
          mode="contained-tonal" 
          buttonColor='#f0f0f0'
          textColor='#c90e0e'
          onPress={() => {
            console.log('Fetching next page...');
            setCurrentPage(currentPage + 1);
          }}>
          View More
        </Button>
      )
    }
  }

  return (
    <>
      {/* <Header /> */}

      <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <FlatList 
        style={{ flex: 1 }}
        data={products}
        extraData={products}
        keyExtractor={(item, index) => item.id}
        renderItem={({item: product, index}) => (
          <ProductCard {...product} key={product.id} />
        )}
        numColumns={3}
        ListHeaderComponent={<HeroCard {...products[0]} />}
        ListHeaderComponentStyle={styles.hero}
        ListFooterComponent={<ViewMoreButton />}
        ListFooterComponentStyle={styles.viewMore}
      />
      </View>
      
    </>
  )
}

const styles = StyleSheet.create({
  // grid: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   justifyContent: 'flex-start',
  //   alignItems: 'flex-start',
  //   marginVertical: 0,
  //   marginHorizontal: 'auto',
  //   gap: 3,
  //   paddingHorizontal: 10
  // },
  hero: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewMore: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})