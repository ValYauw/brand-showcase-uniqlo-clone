import { useState } from 'react';
import { Searchbar, IconButton } from 'react-native-paper';
import { View } from 'react-native';

export default function YunikuroSearchBar() {

  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query) => {
    console.log(query);
    setSearchQuery(query);
  }

  return (
    <View style={{
      padding: 10,
      backgroundColor: 'white',
      color: '#404040',
      fontSize: '20pt',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'
    }}>

      <View style={{
        flexGrow: 1
      }}>
        <Searchbar
          placeholder="Search by Keyword"
          onChangeText={onChangeSearch}
          value={searchQuery}
          theme={{ 
            roundness: 1,
            backgroundColor: "#e8dddc"
          }}
        />
      </View>

      <View style={{
        flexShrink: 5
      }}>
        <IconButton
          icon="cart"
          size={30}
          onPress={() => console.log('Pressed')}
        />
      </View>

    </View>
  );

}