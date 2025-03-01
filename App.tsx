import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper'; // ✅ Ajout de Paper
import { store } from './store';
import PageAccueil from './screens/PageAccueil';
import DetailAnnonce from './screens/DetailAnnonce';
import PageFavoris from './screens/PageFavoris';

export type RootStackParamList = {
  Home: undefined;
  Details: { phone: any };
  Favorites: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={PageAccueil} />
            <Stack.Screen name="Details" component={DetailAnnonce} />
            <Stack.Screen name="Favorites" component={PageFavoris} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
