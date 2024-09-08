import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_CATEGORIES } from '../config/queries';

import { StyleSheet } from 'react-native';
import { FlatList, View, Text } from 'react-native';
import { List } from 'react-native-paper';

import Loader from '../components/Loader';
import ErrorScreen from '../components/ErrorScreen';

// import Header from '../components/Header';

export default function Categories() {

  const [ categories, setCategories ] = useState([]);
  const { data, loading, error } = useQuery(GET_CATEGORIES);
  useEffect(() => {
    setCategories(data?.categories || []);
  }, [data]);

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <ErrorScreen message={error.message} />
  }

  return (
    <View style={{ flex: 1 }}>
      {/* <Header /> */}
      <FlatList
        data={categories}
        renderItem={({item: category, index}) => (
          // <View style={{ flex: 1 }}>
          //   <Text>{category.name}</Text>
          // </View>
          <List.Item
            title={category.name}
          />
        )}
        keyExtractor={(category, index) => category.id}
        ItemSeparatorComponent={(
          <View style={styles.separator} />
        )}
        style={{
          flex: 1
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: "95%",
    marginHorizontal: "2.5%",
    backgroundColor: "#c2c2c2"
  }
})