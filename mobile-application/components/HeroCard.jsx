import { Card, Text } from 'react-native-paper';
import formatAsRupiah from '../helpers/currencyFormatter';
import { Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HeroCard({id, mainImg, name: productName, description, price, category, images}) {

  const navigation = useNavigation();

  return (
    <Card
      elevation={0}
      style={styles.container}
      theme={{
        roundness: 0
      }}
      onPress={() => {
        navigation.navigate("Detail", { id })
      }}
    >

      <Image source={{ uri: mainImg }} style={styles.image} />

      <Card.Content
        style={styles.cardText}
      >

        <Text style={styles.title}>
          {productName}
        </Text>

        <Text>
          {description}
        </Text>

        <Text style={styles.price}>
          {formatAsRupiah(price)}
        </Text>

      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 430,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1/1,
    objectFit: 'cover',
  },
  cardText: {
    paddingHorizontal: 2,
    paddingTop: 12
  },
  title: {
    fontWeight: 'bold'
  },
  price: {
    fontWeight: 'bold',
    paddingTop: 20
  }
})