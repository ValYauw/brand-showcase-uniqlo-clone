import { PaperProvider } from 'react-native-paper';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/client';
import client from './config/apolloClient';

import MainTab from './navigators/MainTab';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
      <PaperProvider>

      <NavigationContainer theme={theme}>
        <MainTab />
      </NavigationContainer>

      </PaperProvider>
      </SafeAreaView>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
    primary: 'black',
    text: 'black',
    border: '#c2c2c2',
    // notification: 'rgb(255, 69, 58)',
  },
};