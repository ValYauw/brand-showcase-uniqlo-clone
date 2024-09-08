import { View, Text } from 'react-native';

export default function ErrorScreen({message}) {
  return (
    <View style={{ 
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center' 
    }}>
      <Text style={{ fontSize: 25 }}>Error!</Text>
      <Text>{message}</Text>
    </View>
  )
}