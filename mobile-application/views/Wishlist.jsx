import { FlatList, View, Text } from 'react-native';

export default function Wishlist() {

  return (
    <>
      <View style={{ 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>Add Items to your Wishlist!</Text>
      </View>
    </>
  )
}