import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import formatAsRupiah from '../helpers/currencyFormatter';
import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProductCard({id, mainImg, name: productName, price, description, category, images}) {

  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const navigation = useNavigation();

  const cardWidth = screenWidth < 450 ? Math.floor((screenWidth - 30) / 3) : Math.floor((screenWidth - 70) / 5);

  return (
    <Card
      elevation={0}
      style={[
        styles.container,
        {
          width: cardWidth
        }
      ]}
      theme={{
        roundness: 0
      }}
      onPress={() => {
        navigation.navigate("Detail", { id })
      }}
    >
      <Card.Cover 
        source={{ uri: mainImg }}
        style={[
          styles.image,
          {
            width: cardWidth - 10,
            height: cardWidth - 10
          }
        ]}
        theme={{
          roundness: 0
        }}
      />
      <Card.Title 
        title={productName}
        style={{
          // padding: 2,
          overflow: 'hidden'
        }}
        titleStyle={{
          fontSize: 12,
          lineHeight: 1.2 * 12
        }}
        titleNumberOfLines={2}
      />
      <Card.Content
        style={{
          // padding: 2
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>
          {formatAsRupiah(price)}
        </Text>
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 2,
    paddingTop: 10,
    paddingBottom: 10
  },
  image: {
    objectFit: 'cover',
  }
})