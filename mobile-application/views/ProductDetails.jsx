import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_PRODUCT } from '../config/queries';

import { ScrollView, Text, Image, View, StyleSheet } from "react-native";
import formatAsRupiah from '../helpers/currencyFormatter';

import Loader from '../components/Loader';
import ErrorScreen from '../components/ErrorScreen';

export default function ProductsDetail({ route }) {
  const params = route.params;
  const { id } = params;

  const [ product, setProduct ] = useState({});
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { id: +id }
  });
  useEffect(() => {
    setProduct(data?.product || {});
  }, [data]);

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <ErrorScreen message={error.message} />
  }

  const { name, description, price, mainImg, images, category } = product;

  const imageUrls = [];
  if (mainImg) imageUrls.push(mainImg);
  if (images) imageUrls.push(...images.map(el => el.imgUrl));
  // console.log(imageUrls);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{ name }</Text>
      <View>
        <Image style={styles.image} source={{ uri: mainImg }} />
      </View>
      <Text style={styles.description}>{ description }</Text>
      <Text style={styles.category}>{ category?.name }</Text>
      <Text style={styles.price}>{ formatAsRupiah(price || 0) }</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  title: {
    fontSize: 14,
    marginBottom: 20
  },
  description: {
    paddingTop: 20,
  },
  category: {
    paddingTop: 20
  },
  price: {
    fontWeight: 'bold',
    fontSize: 22,
    paddingTop: 20
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1/1,
    objectFit: 'cover',
  },
});