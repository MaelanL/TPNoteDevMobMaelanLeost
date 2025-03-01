import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MovieList from '../components/MovieList';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type FavoritesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Favorites'
>;

const FavoritesScreen: React.FC<{
  navigation: FavoritesScreenNavigationProp;
}> = ({ navigation }) => {
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mes Favoris</Text>
      <MovieList
        movies={favorites}
        onPressMovie={(movie) => navigation.navigate('Details', { movie })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default FavoritesScreen;
